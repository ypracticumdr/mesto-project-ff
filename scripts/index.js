// @todo: Темплейт карточки
function getPlaceTemplate() {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".places__item");

  return cardTemplate.cloneNode(true);
}

// @todo: DOM узлы
const placesListElement = document.querySelector(".places__list");

// @todo: Функция создания карточки
function generateCardElement({ data, onClickCallback }) {
  const placeTemplate = getPlaceTemplate();
  const deleteButton = placeTemplate.querySelector(".card__delete-button");

  placeTemplate.querySelector(".card__image").src = data.link;
  placeTemplate.querySelector(".card__image").alt = data.name;
  placeTemplate.querySelector(".card__title").textContent = data.name;

  deleteButton.addEventListener("click", () => {
    onClickCallback(placeTemplate);
  });

  return placeTemplate;
}

// @todo: Функция удаления карточки
function deleteElement(element) {
  element.remove();
}

// @todo: Вывести карточки на страницу
function renderElement({ container, data, onClickCallback }) {
  const card = generateCardElement({
    data: data,
    onClickCallback: onClickCallback
  });

  container.append(card);
}

initialCards.forEach((item) => {
  renderElement({
    container: placesListElement,
    data: item,
    onClickCallback: deleteElement
  });
});

