class Api {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _fetch(url, options = {}) {
    return fetch(url, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`ERROR: ${res.status}`);
        }
      })
      .catch((error) => {
        console.error("Fetch error: ", error);
        return Promise.reject(error);
      });
  }

  getInitialCards() {
    return this._fetch(`${this.baseUrl}/cards`, { headers: this.headers });
  }

  getUserInfo() {
    return this._fetch(`${this.baseUrl}/users/me`, { headers: this.headers });
  }

  likeCard(id, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    return this._fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: method,
      headers: this.headers,
    });
  }

  deleteCard(id) {
    return this._fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  updateUserInfo({ name, about }) {
    return this._fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this.headers,
      },
      body: JSON.stringify({ name, about }),
    });
  }

  updateAvatar(link) {
    return this._fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this.headers,
      },
      body: JSON.stringify({ avatar: link }),
    });
  }

  getNewCards({ name, link }) {
    return this._fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this.headers,
      },
      body: JSON.stringify({ name, link }),
    });
  }
}

export const api = new Api("https://around.nomoreparties.co/v1/web_es_12", {
  authorization: "50b6f104-4531-48f6-93b8-d385b9bebae9",
  "Content-Type": "application/json",
});

export default api;
