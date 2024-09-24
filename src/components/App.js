import React, { useState, useEffect } from "react";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import PopupWithForm from "./PopupWithForm";
import Image from "./Image";
import Api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

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
  const [avatarLink, setAvatarLink] = useState("");
  const [cardTitle, setCardTitle] = useState("");
  const [cardLink, setCardLink] = useState("");

  useEffect(() => {
    Api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
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

  const handleUpdateUser = (userData) => {
    Api.updateUserInfo(userData)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => console.error("Error updating user info: ", err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Main
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick}
        onCardClick={handleCardClick}
        cards={cards}
        setCards={setCards}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <PopupWithForm
        title="Actualizar foto de perfil"
        name="avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onSubmit={(e) => {
          e.preventDefault();
          Api.updateAvatar(avatarLink)
            .then((updatedUser) => {
              setCurrentUser(updatedUser);
              closeAllPopups();
            })
            .catch((err) => console.error("Error updating avatar: ", err));
        }}
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
        onSubmit={(e) => {
          e.preventDefault();
          Api.getNewCards({ name: cardTitle, link: cardLink })
            .then((newCard) => {
              setCards([newCard, ...cards]);
              closeAllPopups();
            })
            .catch((err) => console.error("Error adding new card: ", err));
        }}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
