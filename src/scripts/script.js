// index.js

import '../pages/index.css';
import  {Card}  from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { Popup } from './Popup.js'
import { PopupWithImage } from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';


const page = document.querySelector('.page');

const profileEditButton = page.querySelector('.profile__edit-button');
const popupInputName = page.querySelector('.popup__input_type_name');
const popupInputPersInfo = page.querySelector('.popup__input_type_info');
const popupFormEditProfile = page.querySelector('.popup__form-edit-profile');
const popupAddCardForm = page.querySelector('.popup__form-add-card');
const profileAddButton = page.querySelector('.profile__add-button');
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__form-input-error'
};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardList = new Section({ item : initialCards,
  renderer :(item) => {
    cardList.addItem(generateCard(item));
  }
}, '.elements');

cardList.renderItem()

const popupWithImage = new PopupWithImage('.popup_type_photo-viewer');


const popupWithForm = new PopupWithForm('.popup_type_add-card',{handleFormSubmit:(item) =>{
  cardList.addItem(generateCard(item));
 }
});

const popupUserInfo = new PopupWithForm(".popup_type_edit-profie", {handleFormSubmit:(item) =>{
  userInfo.setUserInfo(item);
 }
});



const userInfo = new UserInfo(".popup_type_edit-profie", {userName: ".profile__name",
userInfo: '.profile__personal-info'})


function generateCard(item) {
  const card = new Card(item, '#card-template', {handleCardClick: (name, link) =>{
    popupWithImage.open(name,link);
  }});
  return card.createCard();
}


profileEditButton.addEventListener('click', function () {
  const currentUserInfo = userInfo.getUserInfo();
  popupInputName.value = currentUserInfo.name
  popupInputPersInfo.value = currentUserInfo.info

  popupUserInfo.open();
});

profileAddButton.addEventListener('click', () =>{
  popupWithForm.open();
});

const validationFormAddCard = new FormValidator(config, popupFormEditProfile);
const validationFormEditProfile = new FormValidator(config, popupAddCardForm);

validationFormAddCard.enableValidation()
validationFormEditProfile.enableValidation()


