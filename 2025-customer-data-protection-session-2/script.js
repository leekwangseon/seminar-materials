const totalSlides = 16;
let currentSlide = 1;

const slideImage = document.querySelector("#slideImage");
const slideNumber = document.querySelector("#slideNumber");
const slideTotal = document.querySelector("#slideTotal");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const thumbs = document.querySelector("#thumbs");

slideTotal.textContent = String(totalSlides);

function slidePath(number) {
  return `./slides/slide-${String(number).padStart(2, "0")}.png`;
}

function renderThumbs() {
  const fragment = document.createDocumentFragment();

  for (let index = 1; index <= totalSlides; index += 1) {
    const button = document.createElement("button");
    const image = document.createElement("img");

    button.className = "thumb";
    button.type = "button";
    button.setAttribute("aria-label", `${index}번 슬라이드 보기`);
    button.addEventListener("click", () => setSlide(index));

    image.src = slidePath(index);
    image.alt = "";
    image.loading = "lazy";

    button.append(image);
    fragment.append(button);
  }

  thumbs.append(fragment);
}

function setSlide(number) {
  currentSlide = Math.min(Math.max(number, 1), totalSlides);
  slideImage.src = slidePath(currentSlide);
  slideImage.alt = `슬라이드 ${currentSlide}`;
  slideNumber.textContent = String(currentSlide);
  prevButton.disabled = currentSlide === 1;
  nextButton.disabled = currentSlide === totalSlides;

  document.querySelectorAll(".thumb").forEach((thumb, index) => {
    thumb.setAttribute("aria-current", String(index + 1 === currentSlide));
  });
}

prevButton.addEventListener("click", () => setSlide(currentSlide - 1));
nextButton.addEventListener("click", () => setSlide(currentSlide + 1));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") setSlide(currentSlide - 1);
  if (event.key === "ArrowRight") setSlide(currentSlide + 1);
});

renderThumbs();
setSlide(1);
