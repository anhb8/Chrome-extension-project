console.log("content.js loaded");

chrome.storage.local.get(['urlList'], result => {
  const urlList = result.urlList || [];
  const currentHostname = window.location.hostname;

  if (urlList.includes(currentHostname)) {
    showAlert();
  }
});
    
    
function showAlert() {
  console.log("content.js received message");
  alert("Go back to study");
}
