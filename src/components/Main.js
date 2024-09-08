import React, { useState, useEffect } from "react";
import avatar from "../images/Avatar.png";
import avatarVector from "../images/avatarVector.png";
import vectorEditButton from "../images/vectorEditButton.png";
import vectorCardButton from "../images/vectorCardButton.png";
import addButton from "../images/addButton.png";
import Api from "../utils/api.js";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]); // Estado para las tarjetas
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    // Solicitud para obtener la información del usuario
    Api.getUserInfo()
      .then((data) => {
        setUserName(data.name || "");
        setUserDescription(data.about || "");
        setUserAvatar(data.avatar || "");
        setCurrentUser(data); // Almacenar el usuario actual
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });

    // Segunda solicitud para obtener las tarjetas
    Api.getInitialCards()
      .then((data) => {
        setCards(data); // Guardamos las tarjetas en el estado
      })
      .catch((error) => {
        console.error("Error fetching cards:", error);
      });
  }, []);

  // Función para manejar el "like"
  const handleLikeClick = (e, card) => {
    e.stopPropagation(); // Evita que se dispare el evento onCardClick

    const isLiked = card.likes.some((like) => like._id === currentUser._id); // Verificar si el usuario actual ha dado like

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
              <p className="profile__name">
                {userName.name || currentUser.name}
              </p>
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
        {/* Mostrar tarjetas usando el template anterior */}
        {cards.map((card) => (
          <div
            key={card._id}
            className="card"
            onClick={() => onCardClick(card)}
          >
            {/* Imagen de la tarjeta */}
            <img
              className="card__image"
              src={card.link}
              alt={card.name}
              style={{ backgroundImage: `url(${card.link})` }}
            />
            <div className="card__text">
              {/* Nombre de la tarjeta */}
              <h2 className="card__title">{card.name}</h2>
              <div className="card__like">
                <button
                  className="card__like-button"
                  onClick={(e) => handleLikeClick(e, card)}
                ></button>
                {/* Número de likes */}
                <span className="card__like-number">{card.likes.length}</span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Main;
