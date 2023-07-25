chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'openSettings') {
      const url = chrome.runtime.getURL('settings.html');
      chrome.tabs.create({ url });
    }
  });
  