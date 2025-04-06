let onigiriImg = "https://media.discordapp.net/attachments/1291434677134950524/1358308078100938793/223_20250406122117.png?ex=67f35e79&is=67f20cf9&hm=58dba1caa7f16ddb89f46eab4bbce8e530253e00997598b71facb71a96012f9a&=&format=webp&quality=lossless&width=150&height=150";
const onigiriStyle = `
    position:fixed;
    top:0px;
    left:0px;
    width: 25px;
    height: 25px; 
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

let lastOnigiriTime = 0;
const interval = 150;

document.addEventListener("mousemove", (event) => {
    const currentTime = Date.now();
    if (currentTime - lastOnigiriTime > interval) {
        lastOnigiriTime = currentTime;
        const onigiri = document.createElement("img");
        onigiri.src = onigiriImg;
        onigiri.style.cssText = onigiriStyle;
        onigiri.style.left = `${event.clientX}px`;
        onigiri.style.top = `${event.clientY}px`;
        onigiri.classList.add("onigiri-element");
        onigiri.style.animation = "fallAndRoll 4s ease-in-out forwards";
        document.body.appendChild(onigiri);
        onigiri.addEventListener("animationend", () => {
            onigiri.remove();
        });
    }
});
