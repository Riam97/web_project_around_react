import React from "react";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <div className="card">
      <img
        className="card__image"
        alt={card.name}
        src={card.link}
        onClick={handleClick}
      />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <button className="card__like-button" onClick={handleLikeClick}>
          Like
        </button>
        <button className="card__delete-button" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Card;
