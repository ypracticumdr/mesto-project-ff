import "../pages/index.css";
import {
  generateCardElement,
  deleteElement,
  onLikeClickCallback,
} from "../components/card.js";
import { openModalWindow, closeModalWindow } from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import * as api from "../components/api.js";

// @todo: DOM узлы
const placesListElement = document.querySelector(".places__list");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const editProfileWindow = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupInputTypeDescription = editProfileWindow.querySelector(
  ".popup__input_type_description"
);
const popupInputTypeName = editProfileWindow.querySelector(
  ".popup__input_type_name"
);

const avatarEditButton = document.querySelector(".profile__image");
const popupAvatarEdit = document.querySelector(".popup_type_avatar");
const avatarEditForm = document.querySelector(
  '.popup__form[name="edit-avatar"]'
);
const popupInputTypeURl = popupAvatarEdit.querySelector(
  ".popup__input_type_avatar"
);

const profileAddButton = document.querySelector(".profile__add-button");
const editCardWindow = document.querySelector(".popup_type_new-card");
const imageWindow = document.querySelector(".popup_type_image");
const captionPopup = imageWindow.querySelector(".popup__caption");

const editCardName = editCardWindow.querySelector(".popup__input_type_card-name");
const editCardUrl = editCardWindow.querySelector(".popup__input_type_url");

const popups = document.querySelectorAll(".popup");

const editProfileForm = document.querySelector(
  '.popup__form[name="edit-profile"]'
);
const addCardForm = document.querySelector('.popup__form[name="new-place"]');

const saveButtonText = "Сохранить";
const savingButtonText = "Сохранение...";

let userInfo;

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
  const closeXButton = popup.querySelector(".popup__close");
  closeXButton.addEventListener("click", () => {
    closeModalWindow(popup);
  });
});

avatarEditButton.addEventListener("click", function (evnt) {
  clearValidation(avatarEditForm, validationConfiguration);
  openModalWindow(popupAvatarEdit);
});

profileEditButton.addEventListener("click", function (evt) {
  popupInputTypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfiguration);
  openModalWindow(editProfileWindow);
});

avatarEditForm.addEventListener("submit", handelAvatarForSubmit);

editProfileWindow.addEventListener("submit", handleProfileFormSubmit);

editCardWindow.addEventListener("submit", handleCardFormSubmit);

function handelAvatarForSubmit(evnt) {
  evnt.preventDefault();
  const avatarUrl = popupInputTypeURl.value;
  const submitButton = evnt.target.querySelector(".popup__button");
  submitButton.textContent = savingButtonText;
  api
    .updateAvatar(avatarUrl)
    .then((profileData) => {
      profileImage.style.backgroundImage = `url(${profileData.avatar})`;
      closeModalWindow(popupAvatarEdit);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      submitButton.textContent = saveButtonText;
    });
}

function handleProfileFormSubmit(evnt) {
  evnt.preventDefault();
  const submitButton = evnt.target.querySelector(".popup__button");
  submitButton.textContent = savingButtonText;
  const profileData = {
    name: popupInputTypeName.value,
    about: popupInputTypeDescription.value,
  };
  api
    .editProfile(profileData)
    .then((userInfo) => {
      renderUserInfo(userInfo);
      closeModalWindow(editProfileWindow);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      submitButton.textContent = saveButtonText;
    });
}

function handleCardFormSubmit(evnt) {
  evnt.preventDefault();
  const submitButton = evnt.target.querySelector(".popup__button");
  submitButton.textContent = savingButtonText;
  const cardData = {
    name: editCardName.value,
    link: editCardUrl.value,
  };
  api
    .addCard(cardData)
    .then((data) => {
      renderElement({
        container: placesListElement,
        data: data,
        onDeleteCallback: deleteElement,
        fromBegining: true,
        onLikeClickCallback: onLikeClickCallback,
        onImageClickCalback: onImageClickCalback,
      });
      closeModalWindow(editCardWindow);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      submitButton.textContent = saveButtonText;
    });
  addCardForm.reset();
}

profileAddButton.addEventListener("click", () => {
  addCardForm.reset();
  clearValidation(addCardForm, validationConfiguration);
  openModalWindow(editCardWindow);
});

function onImageClickCalback(imageLink, imageName) {
  const popupImage = imageWindow.querySelector(".popup__image");

  popupImage.src = imageLink;
  popupImage.alt = imageName;
  captionPopup.textContent = imageName;

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
    myId: userInfo._id,
  });
  fromBegining ? container.prepend(card) : container.append(card);
}

const validationConfiguration = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfiguration);

function renderUserInfo(userInfo) {
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([_userInfo, initialCards]) => {
    userInfo = _userInfo;
    renderUserInfo(_userInfo);

    initialCards.forEach((item) => {
      renderElement({
        container: placesListElement,
        data: item,
        onDeleteCallback: deleteElement,
        onLikeClickCallback: onLikeClickCallback,
        onImageClickCalback: onImageClickCalback,
      });
    });
  })
  .catch((error) => console.log(error));
