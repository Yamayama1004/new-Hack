const searchTerm = "作業用BGM";
let youtubeUrl = null;
let apiKey = null;
let startFlag = false;

fetch('./.env')
  .then(response => response.json())
  .then(config => {
    apiKey = youtubeApiKey;
  });


function authenticateAndSearch() {
  chrome.identity.getAuthToken({ interactive: true }, function (token) {
    if (chrome.runtime.lastError) {
      console.error('認証エラー:', chrome.runtime.lastError);
      return;
    }
    searchVideos(token, apiKey);
  })
}

function changeTabs() {
  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    if (tabs.length > 0) {
      const firstTab = tabs[0];
      setTimeout(function(){
        chrome.tabs.update(firstTab.id, { active: true });
      }, 1000);
    } else {
      console.log('開いているタブがありません。');
    }
  });
}

function searchVideos(accessToken, apiKey) {
  const url = "https://www.googleapis.com/youtube/v3/search?part=id&q=" + encodeURIComponent(searchTerm) + "&maxResults=3&type=video&key=" + apiKey;

  fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.items && data.items.length > 0) {
        const videoIds = data.items.map(item => item.id.videoId).filter(id => id);
        const randomIndex = Math.floor(Math.random() * videoIds.length);
        const randomVideoId = videoIds[randomIndex];
        youtubeUrl = "https://www.youtube.com/watch?v=" + randomVideoId;
        chrome.tabs.create({ url: youtubeUrl, active: true });
        changeTabs();
      } else {
        console.log('検索結果が見つかりませんでした。');
      }
    }).catch(error => {
      console.error('検索エラー:', error);
    });
}

chrome.runtime.onInstalled.addListener(() => {
  authenticateAndSearch();
});


chrome.runtime.onStartup.addListener(() => {
  authenticateAndSearch();
});