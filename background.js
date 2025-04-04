chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    if (request.action  === "sendData"){
        console.log("送られたよー");
        sendResponse({ status: "success", receivedData: request.data });
    }
    return true;
});
  