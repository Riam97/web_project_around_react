import React, { useState, useEffect } from "react";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import Image from "./Image";
import Api from "../utils/api.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });

  const [cards, setCards] = useState([]);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const [avatarLink, setAvatarLink] = useState("");

  const [cardTitle, setCardTitle] = useState("");
  const [cardLink, setCardLink] = useState("");

  useEffect(() => {
    Api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
        setName(userData.name);
        setAbout(userData.about);
      })
      .catch((err) => console.error("Error fetching user info: ", err));

    Api.getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => console.error("Error fetching initial cards: ", err));
  }, []);

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

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    Api.updateUserInfo({ name, about })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => console.error("Error updating user info: ", err));
  };

  const handleSubmitAvatar = (e) => {
    e.preventDefault();
    Api.updateAvatar(avatarLink)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => console.error("Error updating avatar: ", err));
  };

  const handleSubmitCard = (e) => {
    e.preventDefault();
    Api.getNewCards({ name: cardTitle, link: cardLink })
      .then((newCard) => {
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
        cards={cards}
        setCards={setCards}
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

      <Image card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}

export default App;
