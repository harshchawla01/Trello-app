import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchLists } from "../../redux/actions/listActions";
import { fetchCards } from "../../redux/actions/cardActions";
import List from "./List";
import CreateList from "./CreateList";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Import loading icon
import { closestCorners, DndContext } from "@dnd-kit/core";
import { DragOverlay } from "@dnd-kit/core";
import Card from "../Card/Card";
import { moveCard } from "../../redux/actions/cardActions";

const ListContainer = () => {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const { lists, loading: listsLoading } = useSelector((state) => state.lists);
  const { cards, loading: cardsLoading } = useSelector((state) => state.cards);
  const { boards } = useSelector((state) => state.boards);
  const currentBoard = boards.find((board) => board.id === boardId);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    if (boardId) {
      dispatch(fetchLists(boardId));
      dispatch(fetchCards(boardId));
    }
  }, [dispatch, boardId]);

  const handleDragStart = (e) => {
    const { active } = e;
    // setActiveCard(active);
    // console.log(active.id);

    const draggedCard = cards.find((card) => card.id === active.id);
    setActiveCard(draggedCard);
  };
  // console.log(activeCard);

  // const handleDragEnd = (event) => {
  //   const { active, over } = event;
  //   setActiveCard(null);
  //   // console.log(active, over);

  //   if (!over) return;

  //   const fromListId = active.data.current?.listId;
  //   const activeCardId = active.id;
  //   const overListId = over.data.current?.listId;

  //   if (fromListId !== overListId) return;
  //   dispatch(moveCard(activeCardId, overListId));
  // };
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over) return;

    const fromListId = active.data.current?.listId;
    const activeCardId = active.id;
    const overListId = over.data.current?.listId;

    if (fromListId === overListId) {
      const newPosition = over.data.current?.index;
      dispatch(moveCard(activeCardId, fromListId, overListId, newPosition));
    } else {
      dispatch(moveCard(activeCardId, fromListId, overListId));
    }
  };

  if (listsLoading || cardsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <AiOutlineLoading3Quarters
          className="animate-spin text-blue-500"
          size={32}
        />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
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
      <DragOverlay>
        {activeCard ? (
          <Card card={activeCard} index={0} listId={activeCard.listId} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default ListContainer;
