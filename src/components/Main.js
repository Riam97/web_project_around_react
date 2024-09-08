import React, { useState, useEffect } from "react";
import avatar from "../images/Avatar.png";
import avatarVector from "../images/avatarVector.png";
import vectorEditButton from "../images/vectorEditButton.png";
import addButton from "../images/addButton.png";
import Api from "../utils/api.js";
import Card from "./Card.js";

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
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    Api.getUserInfo()
      .then((data) => {
        setUserName(data.name || "");
        setUserDescription(data.about || "");
        setUserAvatar(data.avatar || "");
        setCurrentUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });

    Api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((error) => {
        console.error("Error fetching cards:", error);
      });
  }, []);

  const handleLikeClick = (e, card) => {
    e.stopPropagation();

    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    if (isLiked) {
      Api.likeCard(card._id, isLiked)
        .then((updatedCard) => {
          setCards((prevCards) =>
            prevCards.map((c) => (c._id === card._id ? updatedCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      Api.likeCard(card._id)
        .then((updatedCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? updatedCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-info">
          <div className="profile__avatar-container">
            <img
              className="profile__avatar"
              id="avatar"
              alt="Foto de perfil"
              src={userAvatar || avatar}
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
            handleLikeClick={handleLikeClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
