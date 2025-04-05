chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "closeTab") {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs.length > 0) {
        chrome.tabs.remove(tabs[0].id, () => {
          if (chrome.runtime.lastError) {
            console.error("Error closing tab:", chrome.runtime.lastError.message);
          } else {
            console.log("Tab closed successfully:", tabs[0].id);
          }
        });
      } else {
        console.warn("No active tab found");
      }
    });
  }
});
