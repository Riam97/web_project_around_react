import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const [cardTitle, setCardTitle] = useState("");
  const [cardLink, setCardLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({
      name: cardTitle,
      link: cardLink,
    });
  }

  return (
    <PopupWithForm
      title="Nuevo lugar"
      name="add-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        className="popup__input"
        placeholder="Título del lugar"
        value={cardTitle}
        onChange={(e) => setCardTitle(e.target.value)}
        required
      />
      <input
        type="url"
        name="link"
        className="popup__input"
        placeholder="Enlace de la imagen"
        value={cardLink}
        onChange={(e) => setCardLink(e.target.value)}
        required
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
