import { Popup } from "./Popup.js";

export class UserInfo extends Popup{
  constructor(selector,{userName, userInfo}){
    super(selector);
    this._userName = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
  }

  getUserInfo() {
    return {name: this._userName.textContent,
            info: this._userInfo.textContent }
  }

  setUserInfo({nameUser, personalInfo}) {
    this._userName.textContent = nameUser;
    this._userInfo.textContent = personalInfo;
  }

}

