chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.storage.local.get(['enabled'], function (result) {
    if (!result.enabled) return;

    chrome.tabs.get(activeInfo.tabId, (tab) => {
      if (tab.url.includes("youtube.com")) {
        chrome.tabs.sendMessage(tab.id, { action: "resumeVideo" });
      } else {
        chrome.tabs.query({ url: "*://www.youtube.com/*" }, (tabs) => {
          tabs.forEach((youtubeTab) => {
            chrome.tabs.sendMessage(youtubeTab.id, { action: "pauseVideo" });
          });
        });
      }
    });
  });
}); 