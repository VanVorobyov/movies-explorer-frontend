class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    }
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  setUserInfo(info) {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    });
  }

  saveMovie({ name, link }) {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, link: link }),
    });
  }

  deleteMovie(movie) {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._baseUrl}/movies/${movie}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }
}

const mainApi = new Api({
  // baseUrl: 'http://localhost:3001',
  baseUrl: 'https://api.movies.vanvorobyov.nomoreparties.co',
});

export default mainApi;
