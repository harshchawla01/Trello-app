import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCard, deleteCard } from "../../redux/actions/cardActions";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import edit and trash icons
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

const Card = ({ card, index, listId }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || "");
  // console.log(listId);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: card.id,
      data: {
        listId,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(
        updateCard(card.id, {
          ...card,
          title: title.trim(),
          description: description.trim(),
        })
      );
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteCard(card.id));
  };

  return (
    <div className="bg-white rounded shadow mb-2 p-2">
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            className="w-full p-1 border border-gray-300 rounded mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter card title"
            autoFocus
          />
          <textarea
            className="w-full p-1 border border-gray-300 rounded mb-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter card description (optional)"
            rows="3"
          />
          <div className="flex justify-between">
            <button
              type="button"
              className="text-red-500 hover:text-red-700 text-sm flex items-center"
              onClick={handleDelete}
            >
              <FaTrash className="mr-1" size={12} /> Delete
            </button>
            <div>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 text-sm mr-2"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
                disabled={!title.trim()}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="cursor-pointer flex justify-between"
        >
          <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <h4 className="font-medium">{card.title}</h4>
            {card.description && (
              <p className="text-gray-600 text-sm mt-1">{card.description}</p>
            )}
          </div>
          <FaEdit className="text-gray-400 hover:text-gray-600" size={14} />
        </div>
      )}
    </div>
  );
};

export default Card;
