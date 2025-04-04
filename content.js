const enterEvent = new KeyboardEvent("keydown", {
    key: "Enter",
    code: "Enter",
    keyCode: 13, 
    which: 13,   
    bubbles: true,
    cancelable: true
});

document.addEventListener("keydown", function (event) {
    const searchBox = document.querySelector("textarea[name='q']");

    if (searchBox && document.activeElement === searchBox && event.key === "Enter") {
        event.preventDefault();
        chrome.runtime.sendMessage({ action: "sendData", data: searchBox.value },(response) => {
            console.log("Received response:", response);
        });
        searchBox.dispatchEvent(enterEvent);
    }
});
