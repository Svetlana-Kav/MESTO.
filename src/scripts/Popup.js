export class Popup{
  constructor(selector){
    this._popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown',this._handleEscClose);
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    // evt.preventDefault();
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {

    this._popup.querySelector('.popup__close-icon').addEventListener('click', () =>{
          this.close();
    });

    this._popup.addEventListener('mousedown', (evt) =>{
      if (evt.target === evt.currentTarget) {
      this.close();
    }
    });
  }


}
