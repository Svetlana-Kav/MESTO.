const page = document.querySelector('.page');

const profileEditButton = page.querySelector('.profile__edit-button');
const popupInputName = page.querySelector('.popup__input_type_name');
const popupInputPersInfo = page.querySelector('.popup__input_type_info');
const popupFormEditProfile = page.querySelector('.popup__form-edit-profile');
const popupAddCardForm = page.querySelector('.popup__form-add-card');
const profileAddButton = page.querySelector('.profile__add-button');
const profileEditAvatarButton = page.querySelector('.profile__button-edit-avatar');
const popupFormEditAvatar = page.querySelector('.popup__form-edit-avatar');

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__form-input-error'
};


export {
  popupFormEditAvatar,
  profileEditAvatarButton,
  profileEditButton,
  popupInputName,
  popupInputPersInfo,
  popupFormEditProfile,
  popupAddCardForm,
  profileAddButton,
  config}
