import React from "react";
import closeIcon from "../images/closeIcon.png";

function PopupWithForm({ title, name, isOpen, onClose, children }) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup__opened" : ""}`}
    >
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={onClose}>
          <img
            id={`close-button-${name}`}
            alt="botón para cerrar ventana"
            src={closeIcon}
          />
        </button>
        <h2 className="popup__form-title">{title}</h2>
        <form
          className={`popup__form popup__form_${name}`}
          name={name}
          noValidate
        >
          {children}
          <button className="popup__button" type="submit">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
