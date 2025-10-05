let isSwipe = false;
let startX = 0;
let currentImg = null;

const imageContainer = document.querySelector(".imagecard");
const emojiLike = document.querySelector(".emojifun");
const emojiDislike = document.querySelector(".emojiboring");
const arrayImage = Array.from(imageContainer.querySelectorAll("img"));

console.log(emojiLike);
console.log(emojiDislike);
console.log(arrayImage);

arrayImage.forEach((img, index) => {
  img.style.zIndex = index;
});

function getClientX(e) {
  if (e.type.startsWith("touch")) {
    return e.touches[0]?.clientX || e.changedTouches[0]?.clientX;
  } else {
    return e.clientX;
  }
}

function startSwipe(e) {
  isSwipe = true;
  if (arrayImage.length === 0) return;
  currentImg = arrayImage[arrayImage.length - 1];
  startX = getClientX(e);
}

function endSwipe(e) {
  if (!isSwipe || !currentImg) return;
  isSwipe = false;
  let diffX = getClientX(e) - startX;
  if (Math.abs(diffX) > 150) {
    currentImg.style.transition = "transform 0.4s ease";
    currentImg.style.transform = `translateX(${
      diffX > 0 ? 500 : -500
    }px) rotate(${diffX > 0 ? 45 : -45}deg)`;

    setTimeout(() => {
      currentImg.remove();
      arrayImage.pop();
      currentImg = null;
      emojiLike.style.backgroundColor = "aqua";
      emojiDislike.style.backgroundColor = "aqua";
    }, 400);
  } else {
    currentImg.style.transition = "transform 0.3s ease";
    currentImg.style.transform = "translateX(0px) rotate(0deg)";
    currentImg.style.border = "none";
    emojiLike.style.backgroundColor = "aqua";
    emojiDislike.style.backgroundColor = "aqua";
  }
}
function moveSwipe(e) {
  if (!isSwipe || !currentImg) return;
  isSwipe = true;
  let diffX = getClientX(e) - startX;
  currentImg.style.transition = "none";
  currentImg.style.transform = `translateX(${diffX}px) rotate(${
    diffX / 20
  }deg)`;
  if (diffX > 0) {
    currentImg.style.border = "4px solid green";
    emojiLike.style.backgroundColor = "green";
  } else if (diffX < 0) {
    currentImg.style.border = "4px solid red";
    emojiDislike.style.backgroundColor = "red";
  } else {
    currentImg.style.border = "none";
    emojiLike.style.backgroundColor = "aqua";
    emojiDislike.style.backgroundColor = "aqua";
  }
}

imageContainer.addEventListener("mousedown", startSwipe);
document.addEventListener("mouseup", endSwipe);
document.addEventListener("mousemove", moveSwipe);

imageContainer.addEventListener("touchstart", startSwipe);
document.addEventListener("touchend", endSwipe);
document.addEventListener("touchmove", moveSwipe);
