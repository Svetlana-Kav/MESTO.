import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(name, link) {
      const popupImage = this._popup.querySelector('.popup__image');
      popupImage.setAttribute('src', link);
      popupImage.setAttribute('alt', name);
      this._popup.querySelector('.popup__name-image').textContent = name;
      super.open();
  }
}



