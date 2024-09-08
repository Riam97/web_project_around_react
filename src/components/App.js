import React, { useState, useEffect } from "react";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import Image from "./Image";
import Api from "../utils/api.js";

function App() {
  // Estados para los popups
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // Estados para la información del usuario
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });

  // Estado para las tarjetas
  const [cards, setCards] = useState([]);

  // Estados para los inputs del formulario de edición de perfil
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  // Estado para el input del formulario de actualización de avatar
  const [avatarLink, setAvatarLink] = useState("");

  // Estados para el formulario de nueva tarjeta
  const [cardTitle, setCardTitle] = useState("");
  const [cardLink, setCardLink] = useState("");

  // Efecto para obtener la información del usuario cuando se monta el componente
  useEffect(() => {
    Api.getUserInfo()
      .then((userData) => {
        console.log("User data fetched: ", userData); // Debugging
        setCurrentUser(userData);
        setName(userData.name); // Cargar el nombre en el input
        setAbout(userData.about); // Cargar la ocupación en el input
      })
      .catch((err) => console.error("Error fetching user info: ", err));

    // Obtener las tarjetas iniciales
    Api.getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => console.error("Error fetching initial cards: ", err));
  }, []);

  // Funciones para abrir los popups
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleCardClick = (card) => setSelectedCard(card);

  // Función para cerrar todos los popups
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  };

  // Manejo de la edición de perfil
  const handleSubmitProfile = (e) => {
    e.preventDefault();
    Api.updateUserInfo({ name, about })
      .then((updatedUser) => {
        console.log("User profile updated: ", updatedUser); // Debugging
        setCurrentUser(updatedUser); // Actualiza el estado con la nueva información de usuario
        closeAllPopups();
      })
      .catch((err) => console.error("Error updating user info: ", err));
  };

  // Manejo de la actualización del avatar
  const handleSubmitAvatar = (e) => {
    e.preventDefault();
    Api.updateAvatar(avatarLink)
      .then((updatedUser) => {
        console.log("Avatar updated: ", updatedUser); // Debugging
        setCurrentUser(updatedUser); // Actualiza el avatar en el estado principal
        closeAllPopups();
      })
      .catch((err) => console.error("Error updating avatar: ", err));
  };

  // Manejo de la creación de una nueva tarjeta
  const handleSubmitCard = (e) => {
    e.preventDefault();
    Api.getNewCards({ name: cardTitle, link: cardLink })
      .then((newCard) => {
        console.log("New card added: ", newCard); // Debugging
        setCards((prevCards) => [newCard, ...prevCards]);
        closeAllPopups();
      })
      .catch((err) => console.error("Error adding new card: ", err));
  };

  return (
    <>
      <Main
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick}
        onCardClick={handleCardClick}
        currentUser={currentUser}
        cards={cards} // Pasamos las tarjetas como prop
        setCards={setCards} // Pasamos setCards como prop
      />

      <PopupWithForm
        title="Editar perfil"
        name="edit-profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleSubmitProfile}
      >
        <input
          type="text"
          name="name"
          className="popup__input"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          name="about"
          className="popup__input"
          placeholder="Ocupación"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          required
        />
      </PopupWithForm>

      <PopupWithForm
        title="Nuevo lugar"
        name="add-card"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleSubmitCard}
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

      <PopupWithForm
        title="Actualizar foto de perfil"
        name="avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleSubmitAvatar}
      >
        <input
          type="url"
          name="avatar"
          className="popup__input"
          placeholder="Enlace de la nueva imagen"
          value={avatarLink}
          onChange={(e) => setAvatarLink(e.target.value)}
          required
        />
      </PopupWithForm>

      <Image card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}

export default App;
