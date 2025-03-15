import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import {
  fetchCardsStart,
  fetchCardsSuccess,
  fetchCardsFailure,
  addCardSuccess,
  updateCardSuccess,
  deleteCardSuccess,
} from "../reducers/cardReducer";

export const fetchCards = (boardId) => async (dispatch) => {
  try {
    dispatch(fetchCardsStart());
    const cardsRef = collection(db, "cards");
    const q = query(cardsRef, where("boardId", "==", boardId));
    const snapshot = await getDocs(q);

    const cards = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    cards.sort((a, b) => {
      if (!a.createdAt) return 1;
      if (!b.createdAt) return -1;
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    dispatch(fetchCardsSuccess(cards));
  } catch (error) {
    dispatch(fetchCardsFailure(error.message));
  }
};

export const addCard = (cardData) => async (dispatch) => {
  try {
    const dataToAdd = {
      ...cardData,
      createdAt: cardData.createdAt || new Date().toISOString(),
    };

    const cardsRef = collection(db, "cards");
    const docRef = await addDoc(cardsRef, dataToAdd);
    dispatch(addCardSuccess({ id: docRef.id, ...dataToAdd }));
  } catch (error) {
    console.error("Error adding card:", error);
  }
};

export const updateCard = (cardId, cardData) => async (dispatch) => {
  try {
    const cardRef = doc(db, "cards", cardId);
    await updateDoc(cardRef, cardData);
    dispatch(updateCardSuccess({ id: cardId, ...cardData }));
  } catch (error) {
    console.error("Error updating card:", error);
  }
};

export const deleteCard = (cardId) => async (dispatch) => {
  try {
    const cardRef = doc(db, "cards", cardId);
    await deleteDoc(cardRef);
    dispatch(deleteCardSuccess(cardId));
  } catch (error) {
    console.error("Error deleting card:", error);
  }
};
