chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "sendData") {
        console.log("back", request.data);
        sendResponse({ status: "success", receivedData: "近くの喫茶店" });
        return true;
    }
    return false;
});
