export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// @todo: Темплейт карточки
function getPlaceTemplate() {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".places__item");

  return cardTemplate.cloneNode(true);
}

// @todo: Функция создания карточки
function generateCardElement({
  data,
  onClickCallback,
  likeCallback,
  imageClickCalback,
}) {
  const placeTemplate = getPlaceTemplate();
  const deleteButton = placeTemplate.querySelector(".card__delete-button");
  const cardLikeButton = placeTemplate.querySelector(".card__like-button");
  const cardImage = placeTemplate.querySelector(".card__image");

  placeTemplate.querySelector(".card__image").src = data.link;
  placeTemplate.querySelector(".card__image").alt = data.name;
  placeTemplate.querySelector(".card__title").textContent = data.name;

  deleteButton.addEventListener("click", () => {
    onClickCallback(placeTemplate);
  });

  cardLikeButton.addEventListener("click", () => {
    likeCallback(cardLikeButton);
  });

  cardImage.addEventListener("click", () => {
    imageClickCalback(placeTemplate);
  });

  return placeTemplate;
}

export function renderElement({
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

// @todo: Функция удаления карточки
export function deleteElement(element) {
  element.remove();
}

export function likeCallback(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
