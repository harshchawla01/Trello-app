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
  fetchListsStart,
  fetchListsSuccess,
  fetchListsFailure,
  addListSuccess,
  updateListSuccess,
  deleteListSuccess,
} from "../reducers/listReducer";
import { deleteCardSuccess } from "../reducers/cardReducer";

// export const fetchLists = (boardId) => async (dispatch) => {
//   try {
//     dispatch(fetchListsStart());
//     const listsRef = collection(db, "lists");
//     const q = query(listsRef, where("boardId", "==", boardId));
//     const snapshot = await getDocs(q);

//     const lists = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     lists.sort((a, b) => {
//       if (!a.createdAt) return 1;
//       if (!b.createdAt) return -1;
//       return new Date(a.createdAt) - new Date(b.createdAt); //
//     });

//     dispatch(fetchListsSuccess(lists));
//     return sortedLists;
//   } catch (error) {
//     dispatch(fetchListsFailure(error.message));
//     throw error;
//   }
// };

export const fetchLists = (boardId, signal) => async (dispatch) => {
  try {
    dispatch(fetchListsStart());
    const listsRef = collection(db, "lists");
    const q = query(listsRef, where("boardId", "==", boardId));

    // Pass the signal to getDocs
    const snapshot = await getDocs(q, { signal });

    const lists = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    lists.sort((a, b) => {
      if (!a.createdAt) return 1;
      if (!b.createdAt) return -1;
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    dispatch(fetchListsSuccess(lists));
    return lists;
  } catch (error) {
    // Check if this is an AbortError
    if (error.name !== "AbortError") {
      dispatch(fetchListsFailure(error.message));
    }
    throw error;
  }
};

export const addList = (listData) => async (dispatch) => {
  try {
    const listsRef = collection(db, "lists");
    const docRef = await addDoc(listsRef, listData);
    dispatch(addListSuccess({ id: docRef.id, ...listData }));
  } catch (error) {
    console.error("Error adding list:", error);
  }
};

export const updateList = (listId, listData) => async (dispatch) => {
  try {
    const listRef = doc(db, "lists", listId);
    await updateDoc(listRef, listData);
    dispatch(updateListSuccess({ id: listId, ...listData }));
  } catch (error) {
    console.error("Error updating list:", error);
  }
};

export const deleteList = (listId) => async (dispatch) => {
  try {
    const batch = writeBatch(db);

    const listRef = doc(db, "lists", listId);
    batch.delete(listRef);

    const cardsRef = collection(db, "cards");
    const cardsQuery = query(cardsRef, where("listId", "==", listId));
    const cardsSnapshot = await getDocs(cardsQuery);

    const cardIds = [];
    cardsSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
      cardIds.push(doc.id);
    });

    // Commit the batch
    await batch.commit();

    // Update the Redux store
    dispatch(deleteListSuccess(listId));
    cardIds.forEach((id) => dispatch(deleteCardSuccess(id)));
  } catch (error) {
    console.error("Error deleting list:", error);
  }
};
