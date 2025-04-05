let ghostInterval;
let ghostsImg = [
  "https://cdn.discordapp.com/attachments/905776827505725480/1357374180923801790/ghost1.png?ex=67f14a37&is=67eff8b7&hm=35e7e1714becf22fd432f8435526718179983026f23e63fd603f78be6c3ca2ae&",
  "https://cdn.discordapp.com/attachments/905776827505725480/1357374181578244167/ghost2.png?ex=67f14a37&is=67eff8b7&hm=b7abe839808eda206ce584a62e8ec65bf8faa0dccfaa757473d3195fe2d611a4&",
  "https://cdn.discordapp.com/attachments/905776827505725480/1357374181980901546/ghost3.png?ex=67f14a37&is=67eff8b7&hm=0c3b8ef177ad102c458b7587c8f62e5350def152a7d871e995324d9ccc366d82&",
  "https://cdn.discordapp.com/attachments/905776827505725480/1357374182505058355/ghost4.png?ex=67f14a37&is=67eff8b7&hm=1ea1b6e9934eb02ce41e75fb448bb49761fe48b606cb2ccb572fefa2b456ebe9&"
];

function startGhosts() {
  stopGhosts();
  ghostInterval = setInterval(createGhost, 3000);
}

function stopGhosts() {
  clearInterval(ghostInterval);
  document.querySelectorAll(".ghost").forEach(ghost => ghost.remove());
}

function createGhost() {
  const ghost = document.createElement("img");
  const ghostNumber = Math.floor(Math.random() * 4);
  ghost.src = ghostsImg[ghostNumber];
  ghost.className = "ghost";
  ghost.style.position = "fixed";
  ghost.style.width = "48px";
  ghost.style.height = "48px";
  ghost.style.left = `${Math.random() * (window.innerWidth - 48)}px`;
  ghost.style.top = `${window.innerHeight + 20}px`;
  document.body.appendChild(ghost);

  const speed = 2;
  let intervalId;

  ghost.addEventListener("click", () => {
    clearInterval(intervalId);
    ghost.remove();
  });  

  intervalId = setInterval(() => {
    if (!document.body.contains(ghost)) {
      clearInterval(intervalId);
      return;
    }
    let currentTop = parseInt(ghost.style.top);
    currentTop -= speed;
    ghost.style.top = `${currentTop}px`;

    if (currentTop <= 0) {
      clearInterval(intervalId);
      ghost.remove();
      chrome.runtime.sendMessage({ action: "closeTab" });
    }
  }, 16);
}

chrome.runtime.onMessage.addListener(message => {
  if (message.type === "toggleGhosts") {
    message.enabled ? startGhosts() : stopGhosts();
  }
});