import React, { useState } from "react";
import avatar from "../images/Avatar.png";
import vectorEditButton from "../images/vectorEditButton.png";
import addButton from "../images/addButton.png";
import closeIcon from "../images/closeIcon.png";

function Main() {
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);

  const handleEditAvatar = () => {
    setIsAvatarPopupOpen(true);
    //console.log("Avatar Popup State:", isAvatarPopupOpen);
  };

  const handleEditProfile = () => {
    setIsProfilePopupOpen(true);
  };

  const handleAddCard = () => {
    setIsAddCardPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsAvatarPopupOpen(false);
    setIsProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
  };

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-info">
          <img
            className="profile__avatar"
            id="avatar"
            alt="Foto de perfil"
            src={avatar}
          />
          <img
            className="profile__avatar-edit"
            id="editarPerfil"
            alt="Editar perfil"
            onClick={handleEditAvatar}
          />
          <div className="profile__info">
            <div className="profile__info-button">
              <p className="profile__name">Jacques Cousteau</p>
              <button
                className="profile__edit-button"
                onClick={handleEditProfile}
              >
                <img
                  id="edit-profile-button"
                  alt="botón para editar perfil"
                  src={vectorEditButton}
                />
              </button>
            </div>
            <p className="profile__occupation">Explorer</p>
          </div>
        </div>
        <button className="profile__button-add-card" onClick={handleAddCard}>
          <img
            id="add-card-button"
            alt="botón para agregar tarjeta"
            src={addButton}
          />
        </button>

        {isProfilePopupOpen && (
          <div className="popup popup_is-opened" id="popup__profile">
            <form
              className="popup__form popup__form-edit-profile"
              name="form"
              noValidate
            >
              <button
                className="popup__close-button"
                type="button"
                onClick={closeAllPopups}
              >
                <img
                  id="close-button"
                  alt="botón para cerrar ventana"
                  src={closeIcon}
                />
              </button>
              <h2 className="popup__form-title">Edit profile</h2>
              <input
                id="form-input-name"
                className="popup__input popup__name"
                type="text"
                placeholder="Name"
                minLength="2"
                maxLength="40"
                required
                name="name"
              />
              <span
                className="popup__input-error"
                id="form-input-name-error"
              ></span>
              <input
                id="form-input-about"
                className="popup__input popup__occupation"
                type="text"
                placeholder="Profession"
                minLength="2"
                maxLength="200"
                required
                name="about"
              />
              <span className="popup__input-error" id="form-input-about-error">
                Please, fill out this field.
              </span>
              <button className="popup__button" type="submit">
                Save
              </button>
            </form>
          </div>
        )}

        {isAddCardPopupOpen && (
          <div className="popup popup_is-opened" id="popup__add-card">
            <form
              className="popup__form popup__form-add-card"
              name="form"
              noValidate
            >
              <button
                className="popup__close-button"
                type="button"
                onClick={closeAllPopups}
              >
                <img
                  id="close-button-addCard"
                  alt="botón para cerrar ventana"
                  src={closeIcon}
                />
              </button>
              <h2 className="popup__form-title">Nuevo lugar</h2>
              <input
                id="form-input-title"
                className="popup__input popup__input-title"
                type="text"
                placeholder="Título"
                minLength="2"
                maxLength="30"
                required
                name="name"
              />
              <span className="popup__input-error" id="form-input-title-error">
                Please, fill out this field.
              </span>
              <input
                id="form-input-url"
                className="popup__input popup__input-image"
                type="url"
                placeholder="Enlace a la imagen"
                required
                name="link"
              />
              <span className="popup__input-error" id="form-input-url-error">
                Please, fill out this field.
              </span>
              <button className="popup__button" type="submit">
                Crear
              </button>
            </form>
          </div>
        )}

        {isAvatarPopupOpen && (
          <div className="popup popup_is-opened" id="popup__avatar">
            <div className="popup__container">
              <button
                className="popup__close-button"
                type="button"
                onClick={closeAllPopups}
              >
                <img
                  id="close-button-avatar"
                  alt="botón para cerrar ventana"
                  src={closeIcon}
                />
              </button>
              <form
                className="popup__form popup__form-avatar"
                name="avatar-form"
              >
                <h2 className="popup__form-title">Cambiar foto de perfil</h2>
                <input
                  id="form-input-url-avatar"
                  className="popup__input popup__input-image"
                  type="url"
                  placeholder="Enlace a la imagen"
                  required
                  name="avatar"
                />
                <button
                  className="popup__button popup__save-button"
                  type="submit"
                >
                  Guardar
                </button>
              </form>
            </div>
          </div>
        )}
      </section>

      <section className="cards">
        <div className="cards__template">
          <div className="card">
            <img className="card__image" alt="Card" />
            <button className="card__delete-button"></button>
            <div className="card__text">
              <h2 className="card__title"></h2>
              <div className="card__like">
                <button className="card__like-button"></button>
                <span className="card__like-number"></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Main;
