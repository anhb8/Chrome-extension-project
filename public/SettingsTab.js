var urlBlackList = [];
var urlWhiteList = [];

document.addEventListener('DOMContentLoaded', function() {
  function updateDisplay(urlList) {
    if (urlList == "urlBlackList") {
    document.getElementById(urlList).innerHTML = urlBlackList.join('<br>');
    }
    else {
    document.getElementById(urlList).innerHTML = urlWhiteList.join('<br>');
    }
  }

  // Submit button 
  // document.getElementById("addToBlacklist").onclick = function() {
  //   var input = document.getElementById("blackListurls").value;
  //   urlBlackList.push(input);
  //   updateDisplay("urlBlackList");
  //   document.getElementById("blackListurls").value = '';

  //   chrome.storage.local.set({ urlBlackList }, () => {
  //     chrome.runtime.sendMessage({ type: "updateBlackListUrls" });
  //   });
  // }

  document.getElementById("addToWhitelist").onclick = function() {
    var input = document.getElementById("whiteListurls").value;
    urlWhiteList.push(input);
    updateDisplay("urlWhiteList");
    document.getElementById("whiteListurls").value = '';

    chrome.storage.local.set({ urlWhiteList }, () => {
      chrome.runtime.sendMessage({ type: "updateWhiteListUrls" });
    });
  }

  // Clear button
  // Blacklist
  // document.getElementById("clearBlacklist").onclick = function() {
  //   urlBlackList = [];
  //   updateDisplay("urlBlackList");

  //   chrome.storage.local.set({ urlBlackList }, () => {
  //     chrome.runtime.sendMessage({ type: "updateBlackListUrls" });
  //   });
  // }

  // chrome.storage.local.get(["urlBlackList"], (result) => {
  //   urlBlackList = result.urlBlackList || [];
  //   updateDisplay("urlBlackList");
  // });

  // Whitelist
  document.getElementById("clearWhitelist").onclick = function() {
    urlWhiteList = [];
    updateDisplay("urlWhiteList");

    chrome.storage.local.set({ urlWhiteList }, () => {
      chrome.runtime.sendMessage({ type: "updateWhiteListUrls" });
    });
  }

  chrome.storage.local.get(["urlWhiteList"], (result) => {
    urlWhiteList = result.urlWhiteList || [];
    updateDisplay("urlWhiteList");
  });

      var aboutTab = document.getElementById('aboutTab');
      var blockTab = document.getElementById('blockTab');
      var timerTab = document.getElementById('timerTab');
      openTab('about');
      if (aboutTab && blockTab && timerTab) {
          aboutTab.addEventListener('click', function() {
            openTab('about');
          });

          blockTab.addEventListener('click', function() {
            openTab('block');
          });

          timerTab.addEventListener('click', function() {
              openTab('timer');
          });
      }

  function openTab(tabName) {
    var tabs = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none';
    }

  
  var selectedTab = document.getElementById(tabName);
  if (selectedTab) {
      selectedTab.style.display = 'block';
  }
  }

  // Timer settings
  const storedTimerDuration = localStorage.getItem('timerDuration');
  const storedBreakDuration = localStorage.getItem('breakDuration');

  const timerDurationInput = document.getElementById('timer-duration');
  const breakDurationInput = document.getElementById('break-duration');

  timerDurationInput.value = storedTimerDuration || 45;
  breakDurationInput.value = storedBreakDuration || 5;

  const saveSettingsButton = document.getElementById('save-settings');
  saveSettingsButton.addEventListener('click', function () {
      const timerDuration = timerDurationInput.value;
      const breakDuration = breakDurationInput.value;

      localStorage.setItem('timerDuration', timerDuration);
      localStorage.setItem('breakDuration', breakDuration);

      chrome.storage.sync.set({ defaultTimerDuration: timerDuration }, function () {
          // console.log('Default timer duration updated:', timerDuration);
      });
  });

  // Gif image
//   var pandaGif = document.getElementById('pandaGif');
//   var order = 0;
//   gifContainer.onclick = function () {
//       if (order === 0) {
//           order = 1;
//           pandaGif.src = "./panda-love-heart-mirror.gif";
//       } else {
//           order = 0;
//           pandaGif.src = "./panda-love-heart.gif";
//       }
//   };

});