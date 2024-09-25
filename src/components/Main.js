import React, { useContext } from "react";
import avatar from "../images/Avatar.png";
import avatarVector from "../images/avatarVector.png";
import vectorEditButton from "../images/vectorEditButton.png";
import addButton from "../images/addButton.png";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-info">
          <div className="profile__avatar-container">
            <img
              className="profile__avatar"
              id="avatar"
              alt="Foto de perfil"
              src={currentUser.avatar || avatar}
            />
            <img
              className="profile__avatar-edit"
              id="editarPerfil"
              alt="Editar perfil"
              src={avatarVector}
              onClick={onEditAvatarClick}
            />
          </div>
          <div className="profile__info">
            <div className="profile__info-button">
              <p className="profile__name">{currentUser.name}</p>
              <button
                className="profile__edit-button"
                onClick={onEditProfileClick}
              >
                <img
                  id="edit-profile-button"
                  alt="botón para editar perfil"
                  src={vectorEditButton}
                />
              </button>
            </div>
            <p className="profile__occupation">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__button-add-card" onClick={onAddPlaceClick}>
          <img
            id="add-card-button"
            alt="botón para agregar tarjeta"
            src={addButton}
          />
        </button>
      </section>

      <section className="cards">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
