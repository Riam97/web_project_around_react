import React, { useState } from "react";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import Image from "./Image";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleCardClick = (card) => setSelectedCard(card);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  };

  return (
    <>
      <Main
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <PopupWithForm
        title="Editar perfil"
        name="edit-profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          name="name"
          className="popup__input"
          placeholder="Nombre"
          required
        />
        <input
          type="text"
          name="about"
          className="popup__input"
          placeholder="Ocupación"
          required
        />
      </PopupWithForm>

      <PopupWithForm
        title="Nuevo lugar"
        name="add-card"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          name="title"
          className="popup__input"
          placeholder="Título del lugar"
          required
        />
        <input
          type="url"
          name="link"
          className="popup__input"
          placeholder="Enlace de la imagen"
          required
        />
      </PopupWithForm>

      <PopupWithForm
        title="Actualizar foto de perfil"
        name="avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="url"
          name="avatar"
          className="popup__input"
          placeholder="Enlace de la nueva imagen"
          required
        />
      </PopupWithForm>

      <Image card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}

export default App;
