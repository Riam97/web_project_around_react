import React from "react";

function Card({ card, onCardClick, handleLikeClick }) {
  return (
    <div className="card" onClick={() => onCardClick(card)}>
      <img className="card__image" src={card.link} alt={card.name} />
      <div className="card__text">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like">
          <button
            className="card__like-button"
            onClick={(e) => handleLikeClick(e, card)}
          ></button>
          <span className="card__like-number">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
