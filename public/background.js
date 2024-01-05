console.log("background.js loaded");
function enableBlock() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    if (activeTab) {
    
    chrome.tabs.sendMessage(activeTab.id, { action: 'enableBlock'});
  }
  });
}

function disableBlock() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    if (activeTab) {
    
    chrome.tabs.sendMessage(activeTab.id, { action: 'disableBlock'});
  }
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'openSettings') {
      const url = chrome.runtime.getURL('settings.html');
      chrome.tabs.create({ url });
    }

    if (message.type === 'updateUrls') {
      console.log('message received - background.js');
      chrome.storage.local.get(['urlList'], result => {
        const urlList = result.urlList || [];
        console.log(urlList);
      });
    }

    if (message.action === 'activateBlock') {
      console.log("Block feature is activated -background script");
      enableBlock();
    }

    if (message.action === 'deactivateBlock') {
      
      console.log("Block feature is deactivated -background script");
      disableBlock();
      
    }
    
    
     });
      