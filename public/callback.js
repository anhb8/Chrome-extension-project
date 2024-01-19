document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.hash.substr(1));
const accessToken = params.get('access_token');
const tokenType = params.get('token_type');
const expiresIn = params.get('expires_in');

console.log('Access Token:', accessToken);
console.log('Token Type:', tokenType);
console.log('Expires In:', expiresIn);

chrome.runtime.sendMessage({
  type: 'SPOTIFY_AUTH_RESPONSE',
  accessToken,
  tokenType,
  expiresIn,
});

window.close();

});