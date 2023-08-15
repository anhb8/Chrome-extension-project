console.log("background.js loaded");
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'openSettings') {
      const url = chrome.runtime.getURL('settings.html');
      chrome.tabs.create({ url });
    }

    chrome.tabs.onActivated.addListener(() => {
      console.log("Tabs switched");
      sendContentScriptMessage();
    });

    if (message.type === 'updateUrls') {
      console.log('message received - background.js');
      chrome.storage.local.get(['urlList'], result => {
        const urlList = result.urlList || [];
        console.log(urlList);
      });

      sendContentScriptMessage();
    }

});

// Re-inject content script after update 
function sendContentScriptMessage() {
  chrome.runtime.onInstalled.addListener(async () => {
    for (const cs of chrome.runtime.getManifest().content_scripts) {
      for (const tab of await chrome.tabs.query({active: true, currentWindow: true, url: cs.matches})) {
        chrome.scripting.executeScript({
          target: {tabId: tab.id},
          files: content.js,
        });
      }
    }
  });
}

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.status === 'complete') {
      sendContentScriptMessage();
    }
  });
});
/*
console.log("background.js loaded");
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'openSettings') {
      const url = chrome.runtime.getURL('settings.html');
      chrome.tabs.create({ url });
    }
    
    if (message.type === 'updateUrls') {
      console.log('message received - background.js');
      updateContentScript();
      
    }
});


function updateContentScript(){
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    if (activeTab) {
      console.log('calling function sendContentScriptMessage');
      sendContentScriptMessage(activeTab.id);
    }
  });
}
    
function sendContentScriptMessage(tabId) {
  console.log('Send message to content.js');
  chrome.tabs.sendMessage(tabId, { type: "showAlert" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    }
  });
}
*/