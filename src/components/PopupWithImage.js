import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupNameImage = this._popup.querySelector('.popup__name-image');
  }

  open(name, link) {
      this._popupImage.setAttribute('src', link);
      this._popupImage.setAttribute('alt', name);
      this._popupNameImage.textContent = name;
      super.open();
  }
}



