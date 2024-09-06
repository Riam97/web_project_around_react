import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image ${card ? "popup__opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={onClose}>
          <img
            id="close-button-image"
            alt="botón para cerrar ventana"
            src="/path/to/closeIcon.png"
          />
        </button>
        {card && (
          <>
            <img
              src={card.link}
              alt={card.name}
              className="popup__card-image"
            />
            <p className="popup__card-title">{card.name}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default ImagePopup;
