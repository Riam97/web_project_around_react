import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwner = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((like) => like._id === currentUser._id);

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />
      <div className="card__text">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like">
          <button
            className={`card__like-button ${
              isLiked ? "card__like-button_active" : ""
            }`}
            onClick={handleLikeClick}
          ></button>
          <span className="card__like-number">{card.likes.length}</span>
        </div>
      </div>
      {isOwner && (
        <button className="card__delete-button" onClick={handleDeleteClick}>
          Eliminar
        </button>
      )}
    </div>
  );
}

export default Card;
