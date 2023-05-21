import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup{
  constructor(selector,{handleClick}){
    super(selector)
    this._handleClick = handleClick;
    this._buttonConfirm = this._popup.querySelector('.popup__submit-button_type_confirmation')

  }

  setEventListeners(){
    super.setEventListeners();
    this._buttonConfirm.addEventListener('click', () => {
      this._handleClick(this._data)
    })
  }

  getInfoCard(id){
    this._data = id;
  }


}
