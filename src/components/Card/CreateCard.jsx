import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCard } from "../../redux/actions/cardActions";
import { IoMdAdd } from "react-icons/io"; // Import the add icon

const CreateCard = ({ listId, boardId }) => {
  const dispatch = useDispatch();
  const { cards } = useSelector((state) => state.cards);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      // Get the current cards in this list to determine position
      const listCards = cards.filter((card) => card.listId === listId);

      dispatch(
        addCard({
          title: title.trim(),
          description: description.trim(),
          listId,
          boardId,
          position: listCards.length,
          createdAt: new Date().toISOString(),
        })
      );
      setTitle("");
      setDescription("");
      setIsFormOpen(false);
    }
  };

  return (
    <div>
      {isFormOpen ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter card title"
            autoFocus
          />
          <textarea
            className="w-full p-2 border border-gray-300 rounded mb-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter card description (optional)"
            rows="2"
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              disabled={!title.trim()}
            >
              Add Card
            </button>
            <button
              type="button"
              className="text-gray-600 hover:text-gray-800"
              onClick={() => setIsFormOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          className="w-full text-left text-gray-600 hover:text-gray-800 p-1 flex items-center"
          onClick={() => setIsFormOpen(true)}
        >
          <IoMdAdd className="mr-1" /> Add a card
        </button>
      )}
    </div>
  );
};

export default CreateCard;
