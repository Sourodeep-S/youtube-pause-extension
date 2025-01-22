// Listen for messages from background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const video = document.querySelector('video');
  if (video) {
    if (request.action === "pauseVideo") {
      video.pause();
    } else if (request.action === "resumeVideo") {
      video.play();
    }
  }
});

// Function to handle video state
function handleVideoState(shouldPause) {
  chrome.storage.local.get(['enabled'], function (result) {
    if (!result.enabled) return;

    const video = document.querySelector('video');
    if (video) {
      if (shouldPause) {
        video.pause();
      } else {
        video.play();
      }
    }
  });
}

// Handle window/tab visibility changes
document.addEventListener('visibilitychange', function () {
  handleVideoState(document.hidden);
});

// Handle window focus/blur events
window.addEventListener('blur', function () {
  handleVideoState(true);
});

window.addEventListener('focus', function () {
  handleVideoState(false);
});