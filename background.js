// タブ切り替え対応
chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.storage.local.get(["ghostsEnabled"], data => {
    if (data.ghostsEnabled) {
      chrome.tabs.sendMessage(activeInfo.tabId, { type: "toggleGhosts", enabled: true });
    }
  });
});

// ウィンドウ切り替え対応
chrome.windows.onFocusChanged.addListener(windowId => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) return;
  chrome.tabs.query({ active: true, windowId }, tabs => {
    if (tabs.length === 0) return;
    chrome.storage.local.get(["ghostsEnabled"], data => {
      if (data.ghostsEnabled) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "toggleGhosts", enabled: true });
      }
    });
  });
});

// 新しいタブを開いたとき
chrome.tabs.onCreated.addListener(tab => {
  chrome.storage.local.get(["ghostsEnabled"], data => {
    if (data.ghostsEnabled && tab.id) {
      chrome.tabs.sendMessage(tab.id, { type: "toggleGhosts", enabled: true });
    }
  });
});

// ページ遷移・リロード
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    chrome.storage.local.get(["ghostsEnabled"], data => {
      if (data.ghostsEnabled) {
        chrome.tabs.sendMessage(tabId, { type: "toggleGhosts", enabled: true });
      }
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "closeTab") {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs.length > 0) {
        chrome.tabs.remove(tabs[0].id);
      }
    });
  }
});