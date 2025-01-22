document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('toggleButton');

  // Check initial state from storage
  chrome.storage.local.get(['enabled'], function (result) {
    const isEnabled = result.enabled ?? false;
    updateButtonState(isEnabled);
  });

  toggleButton.addEventListener('click', function () {
    chrome.storage.local.get(['enabled'], function (result) {
      const newState = !(result.enabled ?? false);
      chrome.storage.local.set({ enabled: newState }, function () {
        updateButtonState(newState);
      });
    });
  });

  function updateButtonState(isEnabled) {
    toggleButton.textContent = isEnabled ? 'ON' : 'OFF';
    toggleButton.classList.toggle('active', isEnabled);
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    document.documentElement.classList.toggle('dark-theme', e.matches);
  });
}); 