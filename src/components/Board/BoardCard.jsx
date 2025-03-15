import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateBoard, deleteBoard } from "../../redux/actions/boardActions";
import stringHash from "string-hash";
import {
  FaEdit,
  FaTrash,
  FaEllipsisV,
  FaTimes,
  FaSave,
  FaClipboard,
} from "react-icons/fa";

const BoardCard = ({ board }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(board.title);
  const [showMenu, setShowMenu] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(updateBoard(board.id, { ...board, title: title.trim() }));
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this board?")) {
      dispatch(deleteBoard(board.id));
    }
  };

  // Color options
  const colorOptions = [
    "bg-blue-300",
    "bg-green-300",
    "bg-red-300",
    "bg-yellow-300",
    "bg-purple-300",
    "bg-pink-300",
    "bg-indigo-300",
    "bg-teal-300",
  ];

  const boardColor = colorOptions[stringHash(board.id) % colorOptions.length];

  return (
    <>
      <div
        className={`rounded-lg shadow-md p-4 mb-4 transition-all duration-300 hover:shadow-lg ${boardColor}`}
      >
        {isEditing ? (
          <form onSubmit={handleUpdate} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FaClipboard className="text-gray-700" />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-grow p-2 border rounded"
                autoFocus
              />
            </div>

            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                className="px-3 py-1 bg-gray-200 rounded flex items-center gap-1 hover:bg-gray-300 transition-colors"
                onClick={() => setIsEditing(false)}
              >
                <FaTimes className="text-gray-700" /> Cancel
              </button>

              <button
                type="submit"
                className="px-3 py-1 bg-blue-500 text-white rounded flex items-center gap-1 hover:bg-blue-600 transition-colors"
              >
                <FaSave className="text-white" /> Save
              </button>
            </div>
          </form>
        ) : (
          <div className="flex justify-between items-center">
            <Link
              to={`/boards/${board.id}`}
              className="flex-grow hover:text-blue-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <FaClipboard className="text-gray-700" />
                <h3 className="text-xl font-bold">{board.title}</h3>
              </div>
            </Link>

            <div className="relative">
              <button
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                onClick={() => setShowMenu(!showMenu)}
              >
                <FaEllipsisV className="text-gray-700" />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-10 border">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 transition-colors"
                    onClick={() => {
                      setShowMenu(false);
                      setIsEditing(true);
                    }}
                  >
                    <FaEdit className="text-blue-500" /> Edit
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 transition-colors"
                    onClick={() => {
                      setShowMenu(false);
                      handleDelete();
                    }}
                  >
                    <FaTrash className="text-red-500" /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BoardCard;
