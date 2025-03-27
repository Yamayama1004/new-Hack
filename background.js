chrome.runtime.onStartup.addListener(() => {
  const youtubeUrl = "https://www.youtube.com/watch?v=IhOLjkOytss"; // ここに再生したいYouTube動画のIDを入力

  chrome.tabs.create({
    url: youtubeUrl,
    active: false
  });
});