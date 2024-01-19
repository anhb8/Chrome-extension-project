console.log("background.js loaded");
let blockActivated = false;

function checkBlockActivated() {
  if (blockActivated === true) {
    console.log("Block feature is activated -background script");
    enableBlock();
  } else {
    console.log("Block feature is deactivated -background script");
    disableBlock();
  }
}

function enableBlock() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    if (activeTab) {
      chrome.tabs.sendMessage(activeTab.id, { action: "enableBlock" });
    }
  });
}

function disableBlock() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    if (activeTab) {
      chrome.tabs.sendMessage(activeTab.id, { action: "disableBlock" });
    }
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SPOTIFY_AUTH_RESPONSE") {
    chrome.storage.sync.set({ accessToken: message.accessToken });
  }

  if (message.action === "openSettings") {
    const url = chrome.runtime.getURL("settings.html");
    chrome.tabs.create({ url });
  }

  // if (message.type === 'updateBlackListUrls') {
  //   console.log('message received - background.js');
  //   chrome.storage.local.get(['urlBlackList'], result => {
  //     const urlBlackList = result.urlBlackList || [];
  //     console.log(urlBlackList);
  //   });
  // }

  if (message.type === "updateWhiteListUrls") {
    console.log("message received - background.js");
    chrome.storage.local.get(["urlWhiteList"], (result) => {
      const urlWhiteList = result.urlWhiteList || [];
      console.log(urlWhiteList);
    });
  }

  if (message.action === "activateBlock") {
    const blockButtonStickyValue = message.blockButtonSticky;
    blockActivated = blockButtonStickyValue;
    console.log("Block feature is activated -background script");
    enableBlock();
  }

  if (message.action === "deactivateBlock") {
    const blockButtonStickyValue = message.blockButtonSticky;
    blockActivated = blockButtonStickyValue;
    console.log("Block feature is deactivated -background script");
    disableBlock();
  }

  if (message.action === "spotifyAuthorization") {
    const authorizationCode = message.code;
  }
});

chrome.action.onClicked.addListener(function (tab) {
  console.log("Value of blockActivated: ", blockActivated);
  console.log("Extension is clicked");
  checkBlockActivated();
});

chrome.tabs.onActivated.addListener(function (tab) {
  console.log("Value of blockActivated: ", blockActivated);

  console.log("Tab is switched");
  checkBlockActivated();
});

chrome.runtime.onInstalled.addListener(function () {
  console.log("Value of blockActivated: ", blockActivated);
  checkBlockActivated();
});
