export class Card {
  constructor(data, templateSelector,{handleCardClick}){
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _handleDeleteButtonClick() {
    this._deleteButtonCard.closest('.element').remove();
  }

  _clickLike() {
    this._likeButton.classList.toggle('element__like-button_active');
  }
  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this.handleCardClick(this._name, this._link);
    });

    this._likeButton.addEventListener('click', () => {
      this._clickLike();
    });

    this._deleteButtonCard.addEventListener('click', () => {
      this._handleDeleteButtonClick();
    });
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._deleteButtonCard = this._element.querySelector('.element__delete-button');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._setEventListeners()

    this._element.querySelector(".element__text").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._element
  }
}
