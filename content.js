console.log("content.js is running")

const onigiriImagePath = chrome.runtime.getURL("onigiri.png");
console.log("Onigiri image path:", onigiriImagePath);
const onigiriStyle = `
    position:fixed;
    left:0px;
    pointer-events: none;
    z-index:9999;`;

const fallAnimation = `
  @keyframes fallAndRoll {
    0% {
      transform: translate(-50%, -50%) translateY(0) rotate(0deg);
      opacity: 1;
    }
    80% {
      transform: translate(-50%, -50%) translateY(calc(100vh + 50px)) rotate(720deg);
      opacity: 0.8;
    }
    100% {
      transform: translate(-50%, -50%) translateY(calc(100vh + 100px)) rotate(1080deg);
      opacity: 0;
    }
  }
`;
const styleSheet = document.createElement("style");
styleSheet.textContent = fallAnimation;
document.head.appendChild(styleSheet);

document.addEventListener("mousemove", (event) => {
  const onigiri = document.createElement("img");
  onigiri.src = onigiriImagePath;
  onigiri.style.cssText = onigiriStyle;
  onigiri.style.left = `${event.clientX}px`;
  onigiri.style.top = `${event.clientY}px`;
  onigiri.classList.add("onigiri-element");
  onigiri.style.animation = "fallAndRoll 1.5s ease-in-out forwards";
  document.body.appendChild(onigiri);
  onigiri.addEventListener("animationend", () => {
    onigiri.remove();
  });
});