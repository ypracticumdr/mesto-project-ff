export function openModalWindow(window) {
  document.addEventListener("keydown", closeWindowByEscp);
  window.classList.add("popup_is-animated");
  window.addEventListener("click", closeWindowByClick);

  window.querySelector(".popup__close").addEventListener("click", () => {
    closeModalWindow(window);
  });

  window.classList.add("popup_is-opened");
}

export function closeModalWindow(window) {
  document.removeEventListener("keydown", closeWindowByEscp);
  window.classList.remove("popup_is-opened");
  window.removeEventListener("click", closeWindowByClick);
}

function closeWindowByClick(evnt) {
  if (evnt.target === evnt.currentTarget) {
    closeModalWindow(evnt.currentTarget);
  }
}

function closeWindowByEscp(evnt) {
  if (evnt.key === "Escape") {
    closeModalWindow(evnt.currentTarget.querySelector('.popup_is-opened'));
  }
}
