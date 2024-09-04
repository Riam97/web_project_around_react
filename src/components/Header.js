import React from "react";
import logoAround from "../images/logoAround.png";

function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        id="logo"
        alt="Logo Around the U.S."
        src={logoAround}
      />
    </header>
  );
}

export default Header;
