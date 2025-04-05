document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggleGhosts");
  
    chrome.storage.local.get(["ghostsEnabled"], data => {
      toggleButton.textContent = data.ghostsEnabled ? "OFF" : "ON";
    });
  
    toggleButton.addEventListener("click", () => {
      chrome.storage.local.get(["ghostsEnabled"], data => {
        const newStatus = !data.ghostsEnabled;
        chrome.storage.local.set({ ghostsEnabled: newStatus });
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
          chrome.tabs.sendMessage(tabs[0].id, { type: "toggleGhosts", enabled: newStatus });
        });
        toggleButton.textContent = newStatus ? "OFF" : "ON";
      });
    });
  });