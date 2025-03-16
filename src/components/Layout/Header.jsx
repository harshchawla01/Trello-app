import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import { FaTrello } from "react-icons/fa";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/boards" className="text-xl font-bold flex items-center">
          <h2 className="text-white no-underline flex items-center gap-1 m-0">
            Trello <FaTrello className="inline" />
          </h2>
        </Link>

        {user && (
          <div className="flex items-center">
            {
              <img
                src={user.photoURL}
                alt="User Profile"
                className="w-10 h-10 rounded-full border-2 border-yellow-400"
              />
            }
            <span className="ml-2 mr-4">{user.displayName}</span>
            <button
              onClick={handleLogout}
              className="bg-blue-700 hover:bg-blue-800 py-1 px-3 rounded transition duration-150"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
