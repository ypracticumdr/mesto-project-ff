export function openModalWindow(window) {
  window.classList.add("popup_is-animated");
  window.addEventListener("click", closeWindowByClick);
  window.addEventListener("keydown", closeWindowByEscp);
  window.querySelector(".popup__close").addEventListener("click", () => {
    closeModalWindow(window);
  });

  window.classList.add("popup_is-opened");
}

export function closeModalWindow(window) {
  window.classList.remove("popup_is-opened");
  window.removeEventListener("click", closeWindowByClick);
  window.removeEventListener("keydown", closeWindowByEscp);
}

function closeWindowByClick(evnt) {
  if (evnt.target === evnt.currentTarget) {
    closeModalWindow(evnt.currentTarget);
  }
}

function closeWindowByEscp(evnt) {
  if (evnt.key === "Escape") {
    closeModalWindow(evnt.currentTarget);
  }
}
