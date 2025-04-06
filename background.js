
let GenimiApiKey = "";

const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GenimiApiKey}`;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "sendData") {
        fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: `You are a search query optimizer. Your job is to read user input and output a single optimized Google search query as a space-separated list of keywords. Extract only meaningful words that yield relevant search results. Remove redundant words and focus on keywords that fetch precise results. And return them in the language they were typed in.User input: ${request.data}` }
                        ]
                    }
                ]
            })
        })
        .then(response => response.json())
        .then(data => {
            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
            console.log(reply)
            sendResponse({ reply });
        })
        .catch(err => {
            console.error("Error calling Gemini API", err);
            sendResponse({ reply: "Error occurred" });
        });
        return true; 
    }
});

const searchTerm = "作業用BGM";
let youtubeUrl = null;
let YoutubeApiKey = "";
let startFlag = false;

function authenticateAndSearch() {
  chrome.identity.getAuthToken({ interactive: true }, function (token) {
    if (chrome.runtime.lastError) {
      console.error('認証エラー:', chrome.runtime.lastError);
      return;
    }
    searchVideos(token, YoutubeApiKey);
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
