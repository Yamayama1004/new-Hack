const API_KEY = "AIzaSyBMxCRIyqgsKwRg6XUsQ_MmYBBLlQHs2rc";
const searchTerm = "作業用BGM";
let youtubeUrl = null;

function authenticateAndSearch(){
  chrome.identity.getAuthToken({interactive:true}, function(token){
    if(chrome.runtime.lastError){
      console.error('認証エラー:', chrome.runtime.lastError);
      return;
    }
    searchVideos(token);
  })
}

function searchVideos(accessToken) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=id&q=<span class="math-inline">\{encodeURIComponent\(searchTerm\)\}&maxResults\=3&type\=video&key\=</span>{API_KEY}`;

  fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(response => response.json())
  .then(data => {
    if(data.items && data.items.length > 0){
      const videoIds = data.items.map(item => item.id.videoId).filter(id => id);
      const randomIndex = Math.floor(Math.random() * videoIds.length);
      const randomVideoId = videoIds[randomIndex];
      youtubeUrl = "https://www.youtube.com/watch?v=${randomVideoId}";
      chrome.tabs.create({url:youtubeUrl, active:false});
    } else {
      console.log('検索結果が見つかりませんでした。');
    }
  }).catch(error => {
    console.error('検索エラー:', error);
  });
}

chrome.runtime.onStartup.addListener(() =>{
  authenticateAndSearch();
});