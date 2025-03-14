import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchLists } from "../../redux/actions/listActions";
import { fetchCards } from "../../redux/actions/cardActions";
import List from "./List";
import CreateList from "./CreateList";

const ListContainer = () => {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const { lists, loading: listsLoading } = useSelector((state) => state.lists);
  const { cards, loading: cardsLoading } = useSelector((state) => state.cards);
  const { boards } = useSelector((state) => state.boards);
  const currentBoard = boards.find((board) => board.id === boardId);

  useEffect(() => {
    if (boardId) {
      dispatch(fetchLists(boardId));
      dispatch(fetchCards(boardId));
    }
  }, [dispatch, boardId]);

  if (listsLoading || cardsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">{currentBoard.title}</h1>

        <div className="flex overflow-x-auto pb-2 pt-2">
          {lists.map((list, index) => (
            <List
              key={list.id}
              list={list}
              index={index}
              cards={cards.filter((card) => card.listId === list.id)}
            />
          ))}

          <div className="min-w-[272px] h-fit mx-2">
            <CreateList boardId={boardId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListContainer;
