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
  fetchListsStart,
  fetchListsSuccess,
  fetchListsFailure,
  addListSuccess,
  updateListSuccess,
  deleteListSuccess,
} from "../reducers/listReducer";

export const fetchLists = (boardId) => async (dispatch) => {
  try {
    dispatch(fetchListsStart());
    const listsRef = collection(db, "lists");
    const q = query(listsRef, where("boardId", "==", boardId));
    const snapshot = await getDocs(q);

    const lists = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Sort lists by position
    lists.sort((a, b) => a.position - b.position);

    dispatch(fetchListsSuccess(lists));
  } catch (error) {
    dispatch(fetchListsFailure(error.message));
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
    const listRef = doc(db, "lists", listId);
    await deleteDoc(listRef);
    dispatch(deleteListSuccess(listId));
  } catch (error) {
    console.error("Error deleting list:", error);
  }
};
