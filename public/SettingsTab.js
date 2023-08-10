var urlList = [];

function updateDisplay() {
  document.getElementById("urlList").innerHTML = urlList.join('<br>');
}

// Submit button 
document.getElementById("submit").onclick = function() {
  var input = document.getElementById("urls").value;
  urlList.push(input);
  updateDisplay();
  document.getElementById("urls").value = '';

   chrome.storage.local.set({ urlList }, () => {
    chrome.runtime.sendMessage({ type: "updateUrls" });
  });
}

// Clear button
document.getElementById("clear").onclick = function() {
  urlList = [];
  updateDisplay();

  chrome.storage.local.set({ urlList }, () => {
    chrome.runtime.sendMessage({ type: "updateUrls" });
  });
}

chrome.storage.local.get(["urlList"], (result) => {
  urlList = result.urlList || [];
  updateDisplay();
});

/*
// Verify internal URL
function isInternalExtensionUrl(url) {
  return url.startsWith('chrome-extension://') || url.startsWith('chrome://');
}*/