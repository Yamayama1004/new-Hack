let ghostInterval;

chrome.storage.local.get(["ghostsEnabled"], (data) => {
    if (data.ghostsEnabled) {
        startGhosts();
    }
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "toggleGhosts") {
        if (message.enabled) {
            startGhosts();
        } else {
            stopGhosts();
        }
    }
});

function startGhosts() {
    stopGhosts();
    ghostInterval = setInterval(() => {
        createGhost();
    }, Math.random() * 5000 + 2000);
}

// 幽霊の出現を停止する
function stopGhosts() {
    clearInterval(ghostInterval);
    document.querySelectorAll(".ghost").forEach((ghost) => ghost.remove());
}

function createGhost() {
    const ghost = document.createElement("img");
    const ghostNumber = Math.floor(Math.random() * 4) + 1;
    ghost.src = chrome.runtime.getURL("icons\ghost1.png");
    ghost.classList.add("ghost");
    
    ghost.style.position = "absolute";
    ghost.style.width = "48px";
    ghost.style.height = "48px";
    ghost.style.left = `${Math.random() * (window.innerWidth - 48)}px`;
    ghost.style.top = `${Math.random() * (window.innerHeight - 48)}px`;
    ghost.style.transition = "transform 3s linear";
    
    document.body.appendChild(ghost);

    ghost.addEventListener("click", () => {
        ghost.remove();
    });


    setTimeout(() => {
        ghost.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`;
    }, 100);
}
