// import { data } from "autoprefixer";
// import { forEach } from "core-js/core/array";

export class Section {
  constructor({item ,renderer},containSelector){
    this._data = item;
    this.renderer = renderer;
    this._container = document.querySelector(containSelector);
  }

  renderItem() {
    this._data.forEach((item) =>{
     this.renderer(item);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }

}
