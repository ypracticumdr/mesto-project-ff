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

// @todo: Функция удаления карточки
export function deleteElement(element) {
  element.remove();
}

export function likeCallback(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
