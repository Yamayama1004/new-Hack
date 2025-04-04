const enterEvent = new KeyboardEvent("keydown", {
    key: "Enter",
    code: "Enter",
    keyCode: 13, // 古いブラウザ向け
    which: 13,   // 古いブラウザ向け
    bubbles: true,
    cancelable: true
});

document.addEventListener("keydown", function (event) {
    const searchBox = document.querySelector("textarea[name='q']");

    if (searchBox && document.activeElement === searchBox && event.key === "Enter") {
        event.preventDefault();  
        searchBox.value = "わすれモノ";
        searchBox.dispatchEvent(enterEvent);
    }
});
