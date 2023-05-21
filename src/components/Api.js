export class Api{
  constructor(options){
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleError(response){
    if(!response.ok){
      return Promise.reject(`Ошибка: ${response.status}`)
    }
    return response.json();
  }

  _request(url, options) {
    return fetch(`${this._baseUrl}${url}`, options).then(this._handleError);
  }

  getUserInfo(){
    return this._request('users/me',{
      headers: this._headers
    });
  }

  getCards(){
    return this._request('cards',{
      headers: this._headers
    });
  }

  editUserInfo(data){
    return this._request('users/me',{
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.nameUser,
        about: data.personalInfo
      })
    });
  }

  editUserAvatar(data){
    return this._request('users/me/avatar',{
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    });
  }

  addCard(data){
    return this._request('cards',{
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    });
  }

  deleteCard(id){
    return this._request(`cards/${id}`,{
      method: 'DELETE',
      headers: this._headers
    });
  }

  addLike(id){
    return this._request(`cards/${id}/likes`,{
      method: 'PUT',
      headers: this._headers
    });
  }

  deleteLike(id){
    return this._request(`cards/${id}/likes`,{
      method: 'DELETE',
      headers: this._headers
    });
  }

}
