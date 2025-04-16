import '../pages/index.css';
import { initialCards, getPlaceTemplate } from "../components/cards.js";
import { openModalWindow, closeModalWindow } from '../components/modal.js';



const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const editProfileWindow = document.querySelector('.popup_type_edit');
const editProfileForm = document.querySelector('.popup__form[name="edit-profile"]')
const profileEditButton = document.querySelector('.profile__edit-button');
const closeModalButton = document.querySelector('.popup__close');

const profileAddButton = document.querySelector('.profile__add-button');
const editCardWindow = document.querySelector('.popup_type_new-card');
const imageWindow = document.querySelector('.popup_type_image');


profileEditButton.addEventListener('click',  function (evt) {
  editProfileWindow.querySelector('.popup__input_type_name').value = profileTitle.textContent;
  editProfileWindow.querySelector('.popup__input_type_description').value = profileDescription.textContent;
  openModalWindow(editProfileWindow);
  console.log('Я возникаю, когда печатают в текстовом поле.');
});

editProfileWindow.addEventListener('submit', handleFormSubmit); 
editCardWindow.addEventListener('submit', handleCardFormSubmit); 

function handleFormSubmit(evnt) {
  evnt.preventDefault();
  profileTitle.textContent = evnt.target.querySelector('.popup__input_type_name').value;
  profileDescription.textContent = evnt.target.querySelector('.popup__input_type_description').value
  closeModalWindow(evnt.currentTarget);
  console.log(evnt.target);
  console.log(evnt.currentTarget);

};

function handleCardFormSubmit(evnt) {
  evnt.preventDefault();

  const cardName = editCardWindow.querySelector('.popup__input_type_card-name').value;
  const cardUrl = editCardWindow.querySelector('.popup__input_type_url').value;
  const cardData = {
    name: cardName,
    link: cardUrl
  };

  renderElement({
    container: placesListElement,
    data: cardData,
    onClickCallback: deleteElement,
    fromBegining: true
  });

  closeModalWindow(evnt.currentTarget);
  document.querySelector('.popup__form[name="new-place"]').reset();
};

profileAddButton.addEventListener('click', () => {
  openModalWindow(editCardWindow);
});

function imageClickCalback(placeTemplate) {
  const cardImage = placeTemplate.querySelector('.card__image');
  const caption = placeTemplate.querySelector('.card__title').textContent;

  imageWindow.querySelector('.popup__image').src = cardImage.src;
  imageWindow.querySelector('.popup__image').alt = cardImage.alt;
  imageWindow.querySelector('.popup__caption').textContent = caption;

  openModalWindow(imageWindow);
}



function likeCallback(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
  console.log('like')
};





// @todo: DOM узлы
const placesListElement = document.querySelector(".places__list");

// @todo: Функция создания карточки
function generateCardElement({ data, onClickCallback, likeCallback, imageClickCalback }) {
  const placeTemplate = getPlaceTemplate();
  const deleteButton = placeTemplate.querySelector(".card__delete-button");
  const cardLikeButton = placeTemplate.querySelector('.card__like-button');
  const cardImage = placeTemplate.querySelector('.card__image');

  placeTemplate.querySelector(".card__image").src = data.link;
  placeTemplate.querySelector(".card__image").alt = data.name;
  placeTemplate.querySelector(".card__title").textContent = data.name;

  deleteButton.addEventListener("click", () => {
    onClickCallback(placeTemplate);
  });

  cardLikeButton.addEventListener('click', () => {
    likeCallback(cardLikeButton);
  });

  cardImage.addEventListener('click', () => {imageClickCalback(placeTemplate)});

  return placeTemplate;
}

// @todo: Функция удаления карточки
function deleteElement(element) {
  element.remove();
}

// @todo: Вывести карточки на страницу
function renderElement({ container, data, onClickCallback, fromBegining }) {
  const card = generateCardElement({
    data: data,
    onClickCallback: onClickCallback,
    likeCallback: likeCallback,
    imageClickCalback: imageClickCalback
  });
  fromBegining ? container.prepend(card): container.append(card);
}

initialCards.forEach((item) => {
  renderElement({
    container: placesListElement,
    data: item,
    onClickCallback: deleteElement
  });
});

