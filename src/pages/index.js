import './index.css';
import  {Card}  from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import {handleSubmit} from '../utils/utils.js';

import {
  popupFormEditAvatar,
  profileEditAvatarButton,
  profileEditButton,
  popupInputName,
  popupInputPersInfo,
  popupFormEditProfile,
  popupAddCardForm,
  profileAddButton,
  config } from '../utils/constants.js';


const cards = {};
let userId


const cardList = new Section({
  renderer :(item) => {
    cardList.addItem(generateCard(item));
  }
}, '.elements');


const popupDeleteCard = new PopupWithConfirmation('.popup_type_delete-card', {handleClick:(id) =>{
  deleteCard(id);
}
});
popupDeleteCard.setEventListeners();


const popupWithImage = new PopupWithImage('.popup_type_photo-viewer');
popupWithImage.setEventListeners();


const popupAddCard = new PopupWithForm('.popup_type_add-card',{handleFormSubmit:(inputValues) =>{
  function makeRequest() {
    return api.addCard(inputValues).then((card) => {
      cardList.addItemPrepend(generateCard(card))
    });
  }
  handleSubmit(makeRequest, popupAddCard);
 }
});
popupAddCard.setEventListeners();


const popupUserInfo = new PopupWithForm(".popup_type_edit-profie", {handleFormSubmit:(inputValues) =>{
  function makeRequest() {
    return api.editUserInfo(inputValues).then((resUserInfo) => {
      userInfo.setUserInfo(resUserInfo)
    });
  }
  handleSubmit(makeRequest, popupUserInfo);
 }
});
popupUserInfo.setEventListeners();


const popupAddAvatar = new PopupWithForm(".popup_type_add-avatar",{handleFormSubmit:(inputValues) =>{
  function makeRequest() {
    return api.editUserAvatar(inputValues).then((resUserInfo) => {
      userInfo.setUserInfo(resUserInfo)
    });
  }
  handleSubmit(makeRequest, popupAddAvatar);
 }
});
popupAddAvatar.setEventListeners();


const userInfo = new UserInfo(".popup_type_edit-profie", {userName: ".profile__name",
userInfo: '.profile__personal-info', avatar: '.profile__avatar'})


function generateCard(item) {
  const card = new Card(item, userId, '#card-template', {handleCardClick: (name, link) =>{
    popupWithImage.open(name,link);
  }, handleClickDeleteCard:(id) =>{
    popupDeleteCard.getInfoCard(id);
    popupDeleteCard.open();
  },handleLikeClick: async (isLiked,id) =>{
    if(isLiked){
      try{
        const updatedCard = await api.addLike(id);
        card.addLike();
        card.countLikes(updatedCard)
        return updatedCard
      }catch(error){
        console.log(error);
      }
    }else{
        try{
        const updatedCard = await api.deleteLike(id);
        card.deleteLike();
        card.countLikes(updatedCard)
        return updatedCard
      }catch(error){
        console.log(error);
      }
    }
  }});
  cards[item._id] = card;
  return card.createCard();
}


const validationFormEditProfile = new FormValidator(config, popupFormEditProfile);
const validationFormAddCard = new FormValidator(config, popupAddCardForm);
const validationFormEditAvatar = new FormValidator(config,popupFormEditAvatar);


profileEditButton.addEventListener('click', function () {
  const currentUserInfo = userInfo.getUserInfo();
  popupInputName.value = currentUserInfo.name;
  popupInputPersInfo.value = currentUserInfo.info;
  popupUserInfo.open();
});


profileAddButton.addEventListener('click', () =>{
  validationFormAddCard.resetValidation()
  popupAddCard.open();
});


profileEditAvatarButton.addEventListener('click', () =>{
  validationFormEditAvatar.resetValidation()
  popupAddAvatar.open();
});


validationFormAddCard.enableValidation();
validationFormEditProfile.enableValidation();
validationFormEditAvatar.enableValidation();


const api = new Api({baseUrl:'https://mesto.nomoreparties.co/v1/cohort-66/', headers: {
authorization: 'a09720fa-dec2-49d1-8d7d-bed5706f7374',
'Content-Type': 'application/json'
}});


async function deleteCard(id){
  try{
    const responseDeleteCard = await api.deleteCard(id);
    cards[id].handleDeleteButtonClick()
    popupDeleteCard.close()
    return responseDeleteCard
  }catch(error){
    console.log(error);
  }
}


const initialData = [api.getUserInfo(), api.getCards()];


Promise.all(initialData)
  .then(([data, cards ]) => {
    userId = data._id;
    userInfo.setUserInfo(data);
    cardList.renderItem(cards)
  })
  .catch((err) => console.log(err));

