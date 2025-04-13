let currentSlide = 1;
let lastClickTime = 0;
let clickCount = 0;
let clickTimer;

const image = document.getElementById("sliderImage");
const slideNumber = document.getElementById("slideNumber");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

function fetchImage() {
  image.src = `https://picsum.photos/600/400?random=${Date.now()}`;
  slideNumber.innerText = currentSlide;
}

function throttleNavigation(direction) {
  const now = Date.now();

  // Reset click count every 1 sec
  if (!clickTimer) {
    clickTimer = setTimeout(() => {
      clickCount = 0;
      clickTimer = null;
    }, 1000);
  }

  clickCount++;

  if (clickCount > 3) {
    alert("Chill chill, loading it!!");
    return;
  }

  if (now - lastClickTime >= 1000) {
    if (direction === "next") {
      currentSlide++;
    } else if (direction === "prev" && currentSlide > 1) {
      currentSlide--;
    }
    fetchImage();
    lastClickTime = now;
  }
}

nextBtn.addEventListener("click", () => throttleNavigation("next"));
prevBtn.addEventListener("click", () => throttleNavigation("prev"));
