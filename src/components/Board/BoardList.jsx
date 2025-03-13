import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoards } from "../../redux/actions/boardActions";
import BoardCard from "./BoardCard";
import CreateBoard from "./CreateBoard";
import {
  FaPlus,
  FaSpinner,
  FaClipboardList,
  FaExclamationCircle,
} from "react-icons/fa";

const BoardList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { boards, loading } = useSelector((state) => state.boards);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(fetchBoards(user.uid));
    }
  }, [dispatch, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading your boards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FaClipboardList className="text-blue-500" />
          Your Boards
        </h2>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded flex items-center gap-2 transition-colors"
          onClick={() => setShowCreateForm(true)}
        >
          <FaPlus /> Create Board
        </button>
      </div>

      {showCreateForm && (
        <CreateBoard onClose={() => setShowCreateForm(false)} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}

        {boards.length === 0 && !loading && (
          <div className="col-span-full bg-gray-100 rounded-lg p-8 text-center">
            <FaExclamationCircle className="text-5xl text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              You don't have any boards yet. Create one to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardList;
