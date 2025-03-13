import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBoard } from "../../redux/actions/boardActions";
import { FaSave, FaTimes, FaClipboard } from "react-icons/fa";

const CreateBoard = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(
        addBoard({
          title: title.trim(),
          userId: user.uid,
          createdAt: new Date().toISOString(),
        })
      );
      setTitle("");
      onClose();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label
            htmlFor="board-title"
            className="font-medium mb-2 flex items-center gap-2"
          >
            <FaClipboard className="text-blue-500 inline mr-1" />
            Board Title
          </label>
          <input
            id="board-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter board title"
            className="border rounded p-2"
            autoFocus
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 rounded flex items-center gap-2 hover:bg-gray-300 transition-colors"
            onClick={onClose}
          >
            <FaTimes /> Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded flex items-center gap-2 hover:bg-blue-600 transition-colors"
          >
            <FaSave /> Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBoard;
