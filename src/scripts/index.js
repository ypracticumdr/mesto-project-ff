import "../pages/index.css";
import { initialCards } from "../components/cards.js";
import {
  generateCardElement,
  deleteElement,
  likeCallback,
} from "../components/card.js";
import { openModalWindow, closeModalWindow } from "../components/modal.js";

// @todo: DOM узлы
const placesListElement = document.querySelector(".places__list");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editProfileWindow = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");

const profileAddButton = document.querySelector(".profile__add-button");
const editCardWindow = document.querySelector(".popup_type_new-card");
const imageWindow = document.querySelector(".popup_type_image");

profileEditButton.addEventListener("click", function (evt) {
  editProfileWindow.querySelector(".popup__input_type_name").value =
    profileTitle.textContent;
  editProfileWindow.querySelector(".popup__input_type_description").value =
    profileDescription.textContent;
  openModalWindow(editProfileWindow);
});

editProfileWindow.addEventListener("submit", handleFormSubmit);

editCardWindow.addEventListener("submit", handleCardFormSubmit);

function handleFormSubmit(evnt) {
  evnt.preventDefault();
  profileTitle.textContent = evnt.target.querySelector(
    ".popup__input_type_name"
  ).value;
  profileDescription.textContent = evnt.target.querySelector(
    ".popup__input_type_description"
  ).value;
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
    onClickCallback: deleteElement,
    fromBegining: true,
    likeCallback: likeCallback,
    imageClickCalback: imageClickCalback,
  });

  closeModalWindow(evnt.currentTarget);
  document.querySelector('.popup__form[name="new-place"]').reset();
}

profileAddButton.addEventListener("click", () => {
  openModalWindow(editCardWindow);
});

function imageClickCalback(placeTemplate) {
  const cardImage = placeTemplate.querySelector(".card__image");
  const caption = placeTemplate.querySelector(".card__title").textContent;

  imageWindow.querySelector(".popup__image").src = cardImage.src;
  imageWindow.querySelector(".popup__image").alt = cardImage.alt;
  imageWindow.querySelector(".popup__caption").textContent = caption;

  openModalWindow(imageWindow);
}

// @todo: Вывести карточки на страницу
function renderElement({
  container,
  data,
  onClickCallback,
  fromBegining,
  likeCallback,
  imageClickCalback,
}) {
  const card = generateCardElement({
    data: data,
    onClickCallback: onClickCallback,
    likeCallback: likeCallback,
    imageClickCalback: imageClickCalback,
  });
  fromBegining ? container.prepend(card) : container.append(card);
}

initialCards.forEach((item) => {
  renderElement({
    container: placesListElement,
    data: item,
    onClickCallback: deleteElement,
    likeCallback: likeCallback,
    imageClickCalback: imageClickCalback,
  });
});
