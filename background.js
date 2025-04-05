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
                            { text: `You are a search query optimizer. Convert the following natural language sentence into an effective Google search query. Remove filler words and focus on keywords that retrieve accurate results. User input: ${request.data}` }
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
