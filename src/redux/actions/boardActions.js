import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import {
  fetchBoardsStart,
  fetchBoardsSuccess,
  fetchBoardsFailure,
  addBoardSuccess,
  updateBoardSuccess,
  deleteBoardSuccess,
} from "../reducers/boardReducer";
import { deleteListSuccess } from "../reducers/listReducer";
import { deleteCardSuccess } from "../reducers/cardReducer";

export const fetchBoards = (userId, signal) => async (dispatch) => {
  try {
    dispatch(fetchBoardsStart());
    const boardsRef = collection(db, "boards");
    const q = query(boardsRef, where("userId", "==", userId));
    // Pass the signal to getDocs (supported in Firebase 9.9.0+)
    const snapshot = await getDocs(q, { signal });

    const boards = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    boards.sort((a, b) => {
      if (!a.createdAt) return 1;
      if (!b.createdAt) return -1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    dispatch(fetchBoardsSuccess(boards));
    return sortedBoards;
  } catch (error) {
    if (error.name !== "AbortError") {
      dispatch(fetchBoardsFailure(error.message));
    }
    throw error;
  }
};

export const addBoard = (boardData) => async (dispatch) => {
  try {
    const boardsRef = collection(db, "boards");
    const docRef = await addDoc(boardsRef, boardData);
    dispatch(addBoardSuccess({ id: docRef.id, ...boardData }));
  } catch (error) {
    console.error("Error adding board:", error);
  }
};

export const updateBoard = (boardId, boardData) => async (dispatch) => {
  try {
    const boardRef = doc(db, "boards", boardId);
    await updateDoc(boardRef, boardData);
    dispatch(updateBoardSuccess({ id: boardId, ...boardData }));
  } catch (error) {
    console.error("Error updating board:", error);
  }
};

export const deleteBoard = (boardId) => async (dispatch) => {
  try {
    const batch = writeBatch(db);

    const boardRef = doc(db, "boards", boardId);
    batch.delete(boardRef);

    const listsRef = collection(db, "lists");
    const listsQuery = query(listsRef, where("boardId", "==", boardId));
    const listsSnapshot = await getDocs(listsQuery);

    const listIds = [];
    listsSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
      listIds.push(doc.id); // for store update after batch commit
    });

    const cardsRef = collection(db, "cards");
    const cardsQuery = query(cardsRef, where("boardId", "==", boardId));
    const cardsSnapshot = await getDocs(cardsQuery);

    const cardIds = [];
    cardsSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
      cardIds.push(doc.id);
    });

    await batch.commit();

    dispatch(deleteBoardSuccess(boardId));
    listIds.forEach((id) => dispatch(deleteListSuccess(id)));
    cardIds.forEach((id) => dispatch(deleteCardSuccess(id)));
  } catch (error) {
    console.error("Error deleting board:", error);
  }
};
