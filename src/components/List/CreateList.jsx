import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addList } from "../../redux/actions/listActions";
import { IoMdAdd } from "react-icons/io"; // Import the add icon

const CreateList = ({ boardId }) => {
  const dispatch = useDispatch();
  const { lists } = useSelector((state) => state.lists);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(
        addList({
          title: title.trim(),
          boardId,
          position: lists.length,
          createdAt: new Date().toISOString(),
        })
      );
      setTitle("");
      setIsFormOpen(false);
    }
  };

  return (
    <div className="bg-gray-100 rounded p-2 shadow">
      {isFormOpen ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter list title"
            autoFocus
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              disabled={!title.trim()}
            >
              Add List
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
          className="w-full text-left text-gray-600 hover:text-gray-800 p-2 flex items-center"
          onClick={() => setIsFormOpen(true)}
        >
          <IoMdAdd className="mr-1" /> Add a list
        </button>
      )}
    </div>
  );
};

export default CreateList;
