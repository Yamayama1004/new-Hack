document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleGhosts");

  // 現在の設定を取得してボタンの表示を更新
  chrome.storage.local.get(["ghostsEnabled"], (data) => {
      toggleButton.textContent = data.ghostsEnabled ? "幽霊を消す" : "幽霊を出す";
  });

  // ボタンを押したときの処理
  toggleButton.addEventListener("click", () => {
      chrome.storage.local.get(["ghostsEnabled"], (data) => {
          const newStatus = !data.ghostsEnabled;
          chrome.storage.local.set({ ghostsEnabled: newStatus });

          // コンテンツスクリプトにメッセージを送信
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
              if (tabs[0]?.id) {
                  chrome.tabs.sendMessage(tabs[0].id, { type: "toggleGhosts", enabled: newStatus });
              }
          });

          toggleButton.textContent = newStatus ? "幽霊を消す" : "幽霊を出す";
      });
  });
});
