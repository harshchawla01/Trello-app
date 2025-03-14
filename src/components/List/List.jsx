import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateList, deleteList } from "../../redux/actions/listActions";
import Card from "../Card/Card";
import CreateCard from "../Card/CreateCard";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useParams } from "react-router-dom";

const List = ({ list, index, cards }) => {
  const dispatch = useDispatch();

  const { boardId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(list.title);
  const [showMenu, setShowMenu] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(updateList(list.id, { ...list, title }));
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete this list and all its cards?"
      )
    ) {
      dispatch(deleteList(list.id));
    }
  };

  return (
    <div className="bg-gray-100 rounded w-72 h-fit mx-2 shadow">
      <div className="p-2 flex justify-between items-center">
        {isEditing ? (
          <form onSubmit={handleUpdate} className="w-full">
            <input
              type="text"
              className="w-full p-1 border border-gray-300 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end mt-1 space-x-1">
              <button
                type="button"
                className="text-sm bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <>
            <h3 className="font-semibold text-gray-700">{list.title}</h3>
            <div className="relative">
              <button
                className="p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                onClick={() => setShowMenu(!showMenu)}
              >
                <BsThreeDotsVertical size={16} />
              </button>

              {showMenu && (
                <div className="absolute top-6 right-0 bg-white rounded shadow-lg z-10 w-40">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      setShowMenu(false);
                      setIsEditing(true);
                    }}
                  >
                    Edit Title
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    onClick={() => {
                      setShowMenu(false);
                      handleDelete();
                    }}
                  >
                    Delete List
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div className="p-2 min-h-[10px]">
        {cards.map((card, cardIndex) => (
          <Card key={card.id} card={card} index={cardIndex} listId={list.id} />
        ))}
      </div>

      <div className="p-2">
        <CreateCard listId={list.id} boardId={list.boardId} />
      </div>
    </div>
  );
};

export default List;
