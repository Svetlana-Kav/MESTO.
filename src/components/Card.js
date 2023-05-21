export class Card {
  constructor(data,userId, templateSelector,{handleCardClick, handleClickDeleteCard, handleLikeClick}){
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._myUseriId = userId;
    this._userId = data.owner._id;
    this._templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
    this._likes = data.likes;
    this._handleLikeClick = handleLikeClick;
    this._handleClickDeleteCard = handleClickDeleteCard;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  handleDeleteButtonClick() {
    this._deleteButtonCard.closest('.element').remove();
  }

  addLike(){
    this._likeButton.classList.add('element__like-button_active');
  }

  deleteLike(){
    this._likeButton.classList.remove('element__like-button_active');
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this.handleCardClick(this._name, this._link);
    });

    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('element__like-button_active')){
        this._handleLikeClick(false,this._id);
      }else{
        this._handleLikeClick(true,this._id);
      }
    });

    this._deleteButtonCard.addEventListener('click', () => {
      this._handleClickDeleteCard(this._id);
    });
  }

  checkLike(){
   if(this._likes.some((item) => item._id === this._myUseriId)){
    this.addLike();
  }else{
    this.deleteLike();
  }
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._deleteButtonCard = this._element.querySelector('.element__delete-button');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._elementSumLikes = this._element.querySelector('.element__sum-likes');
    this._setEventListeners();

    if (this._userId !== this._myUseriId){
      this._deleteButtonCard.classList.add('element__delete-button_hidden')
    }

    this._element.querySelector(".element__text").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this.checkLike();
    this.countLikes(this._data)
    return this._element
  }

  countLikes(data){
    this._likes = data.likes;
    this._elementSumLikes.textContent = this._likes.length;
  }
}
