export function openModalWindow(modalWindow) {
  document.addEventListener("keydown", closeWindowByEscp);
  modalWindow.addEventListener("click", closeWindowByClick);
  
  modalWindow.classList.add("popup_is-opened");
}

export function closeModalWindow(modalWindow) {
  document.removeEventListener("keydown", closeWindowByEscp);
  modalWindow.classList.remove("popup_is-opened");
  modalWindow.removeEventListener("click", closeWindowByClick);
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
