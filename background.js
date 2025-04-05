let apiKey = "";

const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

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
