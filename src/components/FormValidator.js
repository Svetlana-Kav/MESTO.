export class FormValidator{
   constructor(config,formElement){
   this._formElement = formElement;
   this._inputSelector = config.inputSelector;
   this._submitButtonSelector = config.submitButtonSelector;
   this._inactiveButtonClass = config.inactiveButtonClass;
   this._inputErrorClass = config.inputErrorClass;
   this._errorClass = config.errorClass;
   this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
   this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
   }

   enableValidation = () => {
      this._setEventListeners();
  };

  _setEventListeners = () => {

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _showInputError = (inputElement, validatyMessage) => {
    this._buttonElement.setAttribute('disabled', true);
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = validatyMessage;
    this._errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    this._buttonElement.removeAttribute('disabled');
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  };

  _toggleButtonState = () =>{
    if (this._hasInvalidInput()){
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    }else{
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _hasInvalidInput = () =>{
    return this._inputList.some((inputElement) => {
     return !inputElement.validity.valid;
   });
  }

  resetValidation = () => {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });

  }






};

