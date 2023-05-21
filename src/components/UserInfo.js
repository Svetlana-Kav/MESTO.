import { Popup } from "./Popup.js";

export class UserInfo extends Popup{
  constructor(selector,{userName, userInfo, avatar},){
    super(selector);
    this._userName = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {name: this._userName.textContent,
            info: this._userInfo.textContent }
  }

  setUserInfo({name, about, avatar}) {
    this._userName.textContent = name;
    this._userInfo.textContent = about;
    this._avatar.src = avatar;
  }

}

