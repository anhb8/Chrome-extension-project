/* global chrome */
import axios from "axios";
import { faPlay,faPause, faStepForward, faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Music.module.css";
import React, { useEffect, useState } from "react";
import Script from "react-load-script";
import { useAsyncError } from "react-router";

const clientId = "617a2f3dd5e74cab8eb565dd84e4bda1";
const clientSecret = "afe45c28f4c94688bbb934c3e218d604";
const redirectUri ="chrome-extension://hppoepccpbammgcaggmfffapnpneannj/callback.html";
const loggedInState = window.localStorage.getItem('SPOTIFY');
const isPlayingState = window.localStorage.getItem('PLAYING');

function Music() {
  const [currentSong, setCurrentSong] = useState(null);
  const [currentAccessToken, setAccessToken] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getCurrentTrack = (userAccessToken) => {
    const currentlyPlayingEndpoint =
      "https://api.spotify.com/v1/me/player/currently-playing";
      if (!userAccessToken) {
        throw new Error('Access token is missing');
      }

    return axios
      .get(currentlyPlayingEndpoint, {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const newIsPlaying = response.data.is_playing;
        window.localStorage.setItem('PLAYING', newIsPlaying);
        if (newIsPlaying) {
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }

        return response.data;})
      .catch((error) => {
        window.localStorage.setItem('PLAYING', JSON.stringify(false));
        window.localStorage.setItem('SPOTIFY', JSON.stringify(false));
        //console.error("Error getting currently playing track:", error);
        throw error;
      });
  };

  // Spotify authentication
  const redirectToSpotifyLogin = () => {
    const authEndpoint = "https://accounts.spotify.com/authorize";

    const queryParams = new URLSearchParams({
      client_id: clientId,
      response_type: "token",
      redirect_uri: redirectUri,
      scope: 'user-read-playback-state user-modify-playback-state user-read-currently-playing',
    });

    const authUrl = `${authEndpoint}?${queryParams}`;
    chrome.tabs.create({ url: authUrl });
  };

  
  // Send command to Spotify 
  const sendPlaybackCommand = (command) => {
    chrome.storage.sync.get(["accessToken"], (result) => {
      const accessToken = result.accessToken;
  
      if (accessToken) {
        const endpoint = `https://api.spotify.com/v1/me/player/${command}`; 
        if (command === 'next' || command === 'previous') {
            axios.post(endpoint, null, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            })
            .then(response => {
              })
              .catch(error => {
                if (error.response && error.response.status === 401) {
                  //console.error('Unauthorized request. Access token may be expired or invalid.');
                } else {
                  //console.error(`Error sending playback command '${command}':`, error);
                }
              });
        } else {
            axios.put(endpoint, null, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                })
                .then(response => {
                    //console.log(`Playback command '${command}' successful:`, response.data);
                  })
                  .catch(error => {
                    if (error.response && error.response.status === 401) {
                      //console.error('Unauthorized request. Access token may be expired or invalid.');
                    } else {
                      //console.error(`Error sending playback command '${command}':`, error);
                    }
                  });
        }  
       
      } else {
        //console.error('Access token not found in Chrome storage. User may not be logged in.');
      }
    });
  };
  
  const refreshAccessToken = async (refreshToken) => {
    try {
      const tokenRefreshEndpoint = 'https://accounts.spotify.com/api/token';
      const payload = new URLSearchParams();
      payload.append('grant_type', 'refresh_token');
      payload.append('refresh_token', refreshToken);
  
      const response = await axios.post(tokenRefreshEndpoint, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
        },
      });
  
      const { access_token: newAccessToken, expires_in: expiresIn } = response.data;
      chrome.storage.sync.set({ accessToken: newAccessToken, expiresIn: expiresIn });
      return newAccessToken;

    } catch (error) {
    //console.error('Error refreshing access token:', error);
      throw error;
    }
  };

  const refreshTokenOrReauthenticate = async () => {
    try {
        chrome.storage.sync.get(["refreshToken"], (result) => {
            const refreshToken = result.refreshToken
            const newAccessToken = refreshAccessToken(refreshToken);
        });
    } catch (error) {
      //console.error('Error refreshing token or re-authenticating:', error);
      
    }
  };

  useEffect(() => {
    const initialloggedInState = window.localStorage.getItem('SPOTIFY');
    const initialisPlayingState = window.localStorage.getItem('PLAYING');
    setIsLoggedIn(JSON.parse(initialloggedInState));
    chrome.storage.sync.get(["accessToken", "expiresIn"], (result) => {
        if (chrome.runtime.lastError) {
            //console.error('Error retrieving data:', chrome.runtime.lastError);
          } else {
            const { accessToken, expiresIn } = result;
            // console.log('Access Token:', accessToken);
            // console.log('Expires In:', expiresIn);
          
            const expirationTimestamp = Date.now() + expiresIn * 1000; 
            // Check if the access token is still valid
            if (accessToken && expiresIn) {
                const expirationTimestamp = Date.now() + expiresIn * 1000;
                chrome.storage.sync.set({ accessToken: accessToken, expiresIn: expiresIn });
                if (Date.now() < expirationTimestamp) {
                  // Token is still valid
                  window.localStorage.setItem('SPOTIFY', JSON.stringify(true));
                  setAccessToken(accessToken);
                  //setIsLoggedIn(true);
          

                } else {
                  // Token has expired
                  window.localStorage.setItem('SPOTIFY', JSON.stringify(false));
                
                  setIsLoggedIn(false);
                  refreshTokenOrReauthenticate();
                 
                }
              } else {
                //console.log("Access token or expiration information is missing");
              }
            
    const fetchCurrentTrackandStatus = () => {
        getCurrentTrack(accessToken)
          .then((currentTrack) => {
            if (currentTrack) {
              //console.log("Currently Playing Track:", currentTrack);
              setCurrentSong(currentTrack);
              document.getElementById('currentTrackName').innerText =  `${currentTrack.item.name} by ${currentTrack.item.artists[0].name}`;
            }
          })
          .catch((error) => {
            //('Error fetching current track:', error);
          });
      };

    fetchCurrentTrackandStatus();
      
    const intervalId = setInterval(fetchCurrentTrackandStatus, 800);
    return () => clearInterval(intervalId);
    }
}); 
  }, []);

  
  const openSpotifyTab = () => {
    chrome.tabs.query({ url: 'https://open.spotify.com/*' }, (tabs) => {
      if (tabs && tabs.length > 0) {
        const spotifyTabId = tabs[0].id;
        chrome.tabs.update(spotifyTabId, { active: true });
      } else {
        chrome.tabs.create({ url: 'https://open.spotify.com/' });
      }
    });
  };
  

const handleLoginButton = () => {
    redirectToSpotifyLogin();
}

const handleNextButtonClick = () => {
      sendPlaybackCommand('next');
      setIsPlaying(true);
};

const handlePreviousButtonClick = () => {
    sendPlaybackCommand('previous');
    setIsPlaying(true);
};

const handlePauseButtonClick = () => {
    sendPlaybackCommand('pause');
    window.localStorage.setItem('PLAYING', JSON.stringify(false));
};

const handlePlayButtonClick = () => {
    sendPlaybackCommand('play');
    window.localStorage.setItem('PLAYING', JSON.stringify(true));
 
};
  
  return (
    <div> 
      {isLoggedIn && (
        <div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <FontAwesomeIcon id="previous" className={classes.music} icon={faStepBackward} onClick={handlePreviousButtonClick}/>
                <div>
                {isPlaying ? ( 
                <FontAwesomeIcon id="pause" className={classes.music} icon={faPause} onClick={handlePauseButtonClick} /> 
                ) : (
                <FontAwesomeIcon id="play" className={classes.music} icon={faPlay} onClick={handlePlayButtonClick}/> 
                )}
                </div>
                <FontAwesomeIcon id="next" className={classes.music} icon={faStepForward} onClick={handleNextButtonClick}/>
                <div className={classes.waveContainer}> 
                <div className={`${classes.wave} ${isPlaying ? classes.activeWave : ''}`}></div>
                <div className={`${classes.wave} ${isPlaying ? classes.activeWave : ''}`}></div>
                <div className={`${classes.wave} ${isPlaying ? classes.activeWave : ''}`}></div>
                <div className={`${classes.wave} ${isPlaying ? classes.activeWave : ''}`}></div>
                <div className={`${classes.wave} ${isPlaying ? classes.activeWave : ''}`}></div>
                <div className={`${classes.wave} ${isPlaying ? classes.activeWave : ''}`}></div>
                <div className={`${classes.wave} ${isPlaying ? classes.activeWave : ''}`}></div>
                <div className={`${classes.wave} ${isPlaying ? classes.activeWave : ''}`}></div>
                <div className={`${classes.wave} ${isPlaying ? classes.activeWave : ''}`}></div>
                <div className={`${classes.wave} ${isPlaying ? classes.activeWave : ''}`}></div>
                <div className={`${classes.wave} ${isPlaying ? classes.activeWave : ''}`}></div>
                <div className={`${classes.wave} ${isPlaying ? classes.activeWave : ''}`}></div>
                <div className={`${classes.wave} ${isPlaying ? classes.activeWave : ''}`}></div>
                <div className={`${classes.wave} ${isPlaying ? classes.activeWave : ''}`}></div>
                </div>
            </div>
            <p id="currentTrackName" className={classes.trackTitle}></p>
        </div>
      )}

      {!isLoggedIn && (
        <div>
          <FontAwesomeIcon id="spotifyButton" className={classes.music} icon={faPlay} onClick={handleLoginButton}/>
          <p id="currentTrackName" className={classes.trackTitle}>Log in Spotify</p>
        </div>
      )}
    </div>
  );
}

export default Music;
