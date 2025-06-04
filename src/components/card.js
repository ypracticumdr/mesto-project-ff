import { deleteCard, setLike, unsetLike } from "../components/api.js";

// @todo: Темплейт карточки
function getPlaceTemplate() {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".places__item");

  return cardTemplate.cloneNode(true);
}

// @todo: Функция создания карточки
export function generateCardElement({
  data,
  onDeleteCallback,
  onLikeClickCallback,
  onImageClickCalback,
  myId,
}) {
  const placeTemplate = getPlaceTemplate();
  const deleteButton = placeTemplate.querySelector(".card__delete-button");
  const cardLikeButton = placeTemplate.querySelector(".card__like-button");
  const cardImage = placeTemplate.querySelector(".card__image");
  const likeCounter = placeTemplate.querySelector(".card__like-counter");
  const isMyCard = data.owner._id === myId;
  const likeCounterValue = data.likes.length;
  const isLikedByMe = data.likes.find(
    (element) => element._id === myId
  );

  if (!isMyCard) deleteButton.remove();
  if (isLikedByMe) cardLikeButton.classList.add("card__like-button_is-active");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  placeTemplate.querySelector(".card__title").textContent = data.name;
  likeCounter.textContent = likeCounterValue;

  deleteButton.addEventListener("click", () => {
    onDeleteCallback(placeTemplate, data._id);
  });

  cardLikeButton.addEventListener("click", () => {
    onLikeClickCallback(cardLikeButton, likeCounter, data._id);
  });

  cardImage.addEventListener("click", () => {
    onImageClickCalback(data.link, data.name);
  });

  return placeTemplate;
}

// @todo: Функция удаления карточки
export function deleteElement(element, cardId) {
  deleteCard(cardId)
    .then(() => {
      element.remove();
    })
    .catch((error) => console.log(error));
}

export function onLikeClickCallback(likeButton, likeCounter, cardId) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const response = isLiked ? unsetLike(cardId) : setLike(cardId);
  response
    .then((data) => {
      const likeCounterValue = data.likes.length;
      likeCounter.textContent = likeCounterValue;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((error) => console.log(error));
}