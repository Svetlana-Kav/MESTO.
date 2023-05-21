export class Section {
  constructor({renderer},containSelector){
    this.renderer = renderer;
    this._container = document.querySelector(containSelector);
  }

  renderItem(data) {
    data.forEach((item) =>{
     this.renderer(item);
    });
  }

  addItem(item) {
    this._container.append(item);
  }

  addItemPrepend(item){
    this._container.prepend(item);
  }

}
