import React from "react";
import { Link } from "react-router-dom";
import { FaTrello } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <Link
        to="/boards"
        className="text-xl font-bold no-underline flex items-center"
      >
        <h2 className="text-white flex items-center gap-1 m-0">
          Trello <FaTrello className="inline" />
        </h2>
      </Link>
    </header>
  );
};

export default Header;
