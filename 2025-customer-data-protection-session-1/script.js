const totalPages = 24;
let currentPage = 1;

const pageImage = document.querySelector("#pageImage");
const pageNumber = document.querySelector("#pageNumber");
const pageTotal = document.querySelector("#pageTotal");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const thumbs = document.querySelector("#thumbs");

pageTotal.textContent = String(totalPages);

function pagePath(number) {
  return `./pages/page-${String(number).padStart(2, "0")}.png`;
}

function renderThumbs() {
  const fragment = document.createDocumentFragment();

  for (let index = 1; index <= totalPages; index += 1) {
    const button = document.createElement("button");
    const image = document.createElement("img");

    button.className = "thumb";
    button.type = "button";
    button.setAttribute("aria-label", `${index}페이지 보기`);
    button.addEventListener("click", () => setPage(index));

    image.src = pagePath(index);
    image.alt = "";
    image.loading = "lazy";

    button.append(image);
    fragment.append(button);
  }

  thumbs.append(fragment);
}

function setPage(number) {
  currentPage = Math.min(Math.max(number, 1), totalPages);
  pageImage.src = pagePath(currentPage);
  pageImage.alt = `문서 ${currentPage}페이지`;
  pageNumber.textContent = String(currentPage);
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;

  document.querySelectorAll(".thumb").forEach((thumb, index) => {
    thumb.setAttribute("aria-current", String(index + 1 === currentPage));
  });
}

prevButton.addEventListener("click", () => setPage(currentPage - 1));
nextButton.addEventListener("click", () => setPage(currentPage + 1));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") setPage(currentPage - 1);
  if (event.key === "ArrowRight") setPage(currentPage + 1);
});

renderThumbs();
setPage(1);
