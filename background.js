const API_KEY = "AIzaSyBMxCRIyqgsKwRg6XUsQ_MmYBBLlQHs2rc";
const searchTerm = "作業用BGM";
let youtubeUrl = null;

function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
  }).then(() => {
    searchVideos(searchTerm);
  }).catch(error => {
    console.error('APIクライアントの初期化エラー:', error);
  });
}

function searchVideos(query) {
  gapi.client.youtube.search.list({
    part: 'id',
    q: query,
    maxResults: 3,
    type: 'video'
  }).then(response => {
    const videoIds = response.result.items.map(item => item.id.videoId).filter(id => id);


    if (videoIds.length > 0) {
      const randomIndex = Math.floor(Math.random() * videoIds.length);
      const randomVideoId = videoIds[randomIndex];
      console.log('ランダムに選択した動画ID:', randomVideoId);
      youtubeUrl = `https://www.youtube.com/watch?v=${randomVideoId}`;
      createStartupTab();
    } else {
      console.log('検索結果が見つかりませんでした。');
    }
  }).catch(error => {
    console.error('検索エラー:', error);
  });
}

function createStartupTab(){
  if (youtubeUrl){
    chrome.tabs.create({
      url: youtubeUrl,
      active: false
  });
  }
}

chrome.runtime.onStartup.addListener(() =>{
  initClient();
});