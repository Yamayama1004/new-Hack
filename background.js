chrome.runtime.onStartup.addListener(() => {
  const youtubeUrl = "https://www.youtube.com/watch?v=IhOLjkOytss";

  chrome.tabs.create({
    url: youtubeUrl,
    active: false
  });
});