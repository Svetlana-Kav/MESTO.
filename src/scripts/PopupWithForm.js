import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
  constructor(selector, {handleFormSubmit}) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
}

_getInputValues(){
 this._inputList = this._popup.querySelectorAll('.popup__input');

 this._inputsValue ={};
 this._inputList.forEach((element) => {
 this._inputsValue[element.name] = element.value;
 });

 return this._inputsValue;
}

setEventListeners(){
  this._popupForm.addEventListener('submit',(evt) =>{
    evt.preventDefault()
    this._handleFormSubmit(this._getInputValues());
    this.close();
  })
  super.setEventListeners();
}

close(){
  this._popupForm.reset();
  super.close()
}

}
