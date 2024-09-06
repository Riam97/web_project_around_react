import React, { useState, useEffect } from "react";
import avatar from "../images/Avatar.png";
import avatarVector from "../images/avatarVector.png";
import vectorEditButton from "../images/vectorEditButton.png";
import vectorCardButton from "../images/vectorCardButton.png";
import addButton from "../images/addButton.png";
import api from "../utils/api";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setUserName(data.name || "");
        setUserDescription(data.about || "");
        setUserAvatar(data.avatar || "");
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });

    api
      .getInitialCards()
      .then((data) => {
        console.log(data);
        setCards(data);
      })
      .catch((error) => {
        console.error("Error fetching cards:", error);
      });
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-info">
          <div className="profile__avatar-container">
            <img
              className="profile__avatar"
              id="avatar"
              alt="Foto de perfil"
              src={avatar}
              style={{ backgroundImage: `url(${userAvatar})` }}
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
              <p className="profile__name">{userName}</p>
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
            <p className="profile__occupation">{userDescription}</p>
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
          <div
            key={card._id}
            className="card"
            onClick={() => onCardClick(card)}
          >
            <img className="card__image" src={card.link} alt={card.name} />{" "}
            <h2 className="card__title">{card.name}</h2>
            <div className="card__like">
              <button
                className="card__like-button"
                onClick={(e) => handleLikeClick(e, card)}
              >
                <img src={vectorCardButton} alt="Like button" />
              </button>
              <span className="card__like-number">{card.likes.length}</span>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Main;
