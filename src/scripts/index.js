import "../pages/index.css";
import { initialCards } from "../components/cards.js";
import {
  generateCardElement,
  deleteElement,
  onLikeClickCallback,
} from "../components/card.js";
import { openModalWindow, closeModalWindow } from "../components/modal.js";

// @todo: DOM узлы
const placesListElement = document.querySelector(".places__list");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editProfileWindow = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupInputTypeDescription = editProfileWindow.querySelector(".popup__input_type_description");
const popupInputTypeName = editProfileWindow.querySelector(".popup__input_type_name");

const profileAddButton = document.querySelector(".profile__add-button");
const editCardWindow = document.querySelector(".popup_type_new-card");
const imageWindow = document.querySelector(".popup_type_image");

const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
  const closeXButton = popup.querySelector('.popup__close');
  closeXButton.addEventListener("click", () => {
    closeModalWindow(popup);
  });
});

profileEditButton.addEventListener("click", function (evt) {
  popupInputTypeName.value =
    profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
  openModalWindow(editProfileWindow);
});

editProfileWindow.addEventListener("submit", handleProfileFormSubmit);

editCardWindow.addEventListener("submit", handleCardFormSubmit);

function handleProfileFormSubmit(evnt) {
  evnt.preventDefault();
  profileTitle.textContent = popupInputTypeName.value;
  profileDescription.textContent = popupInputTypeDescription.value;
  closeModalWindow(evnt.currentTarget);
}

function handleCardFormSubmit(evnt) {
  evnt.preventDefault();

  const cardName = editCardWindow.querySelector(
    ".popup__input_type_card-name"
  ).value;
  const cardUrl = editCardWindow.querySelector(".popup__input_type_url").value;
  const cardData = {
    name: cardName,
    link: cardUrl,
  };

  renderElement({
    container: placesListElement,
    data: cardData,
    onDeleteCallback: deleteElement,
    fromBegining: true,
    onLikeClickCallback: onLikeClickCallback,
    onImageClickCalback: onImageClickCalback,
  });

  closeModalWindow(evnt.currentTarget);
  document.querySelector('.popup__form[name="new-place"]').reset();
}

profileAddButton.addEventListener("click", () => {
  openModalWindow(editCardWindow);
});

function onImageClickCalback(imageLink, imageName) {
  const popupImage = imageWindow.querySelector(".popup__image");

  popupImage.src = imageLink;
  popupImage.alt = imageName;
  imageWindow.querySelector(".popup__caption").textContent = imageName;

  openModalWindow(imageWindow);
}

// @todo: Вывести карточки на страницу
function renderElement({
  container,
  data,
  onDeleteCallback,
  fromBegining,
  onLikeClickCallback,
  onImageClickCalback,
}) {
  const card = generateCardElement({
    data: data,
    onDeleteCallback: onDeleteCallback,
    onLikeClickCallback: onLikeClickCallback,
    onImageClickCalback: onImageClickCalback,
  });
  fromBegining ? container.prepend(card) : container.append(card);
}

initialCards.forEach((item) => {
  renderElement({
    container: placesListElement,
    data: item,
    onDeleteCallback: deleteElement,
    onLikeClickCallback: onLikeClickCallback,
    onImageClickCalback: onImageClickCalback,
  });
});
