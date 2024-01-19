/* global chrome */
import axios from "axios";
import { faPlay,faPause, faStepForward, faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Music.module.css";
import React, { useEffect, useState } from "react";
import Script from "react-load-script";

function Music() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  chrome.storage.sync.get(["accessToken"], (result) => {
    const accessToken = result.accessToken;
    console.log("Received Access Token in App.js:", accessToken);

    if (accessToken) {
      setIsLoggedIn(true);
      console.log("User logged in: ", isLoggedIn);
    }
    getCurrentTrack(accessToken)
      .then((currentTrack) => {
        console.log("Currently Playing Track:", currentTrack);
        document.getElementById("currentTrackName").innerText =
          currentTrack.item.name;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  const getCurrentTrack = (userAccessToken) => {
    const currentlyPlayingEndpoint =
      "https://api.spotify.com/v1/me/player/currently-playing";

    return axios
      .get(currentlyPlayingEndpoint, {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error getting currently playing track:", error);
        throw error;
      });
  };

  // Spotify authentication
  const redirectToSpotifyLogin = () => {
    const clientId = "617a2f3dd5e74cab8eb565dd84e4bda1";
    const redirectUri =
      "chrome-extension://olohhkoeiaingedfoafpppfjcpanjkmk/callback.html";
    const authEndpoint = "https://accounts.spotify.com/authorize";

    const queryParams = new URLSearchParams({
      client_id: clientId,
      response_type: "token",
      redirect_uri: redirectUri,
      scope: "user-read-currently-playing",
    });

    const authUrl = `${authEndpoint}?${queryParams}`;
    chrome.tabs.create({ url: authUrl });
  };

  useEffect(() => {
    document.getElementById("spotifyButton").addEventListener("click", () => {
      redirectToSpotifyLogin();
    });
  }, []);

  console.log("Playback status: ", isPlaying);
  return (
    <div>
      {isLoggedIn && (
        <div>
          <FontAwesomeIcon
            id="spotifyButton"
            className={classes.music}
            icon={faPlay}
          />
          <p id="currentTrackName">Song playing:</p>
        </div>
      )}

      {!isLoggedIn && (
        <div>
          <FontAwesomeIcon
            id="spotifyButton"
            className={classes.music}
            icon={faPlay}
          />
          <p id="currentTrackName">Log in Spotify</p>
        </div>
      )}
    </div>
  );
}

export default Music;
