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
  fetchBoardsStart,
  fetchBoardsSuccess,
  fetchBoardsFailure,
  addBoardSuccess,
  updateBoardSuccess,
  deleteBoardSuccess,
} from "../reducers/boardReducer";

export const fetchBoards = (userId) => async (dispatch) => {
  try {
    dispatch(fetchBoardsStart());
    const boardsRef = collection(db, "boards");
    const q = query(boardsRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    const boards = snapshot.docs.map((doc) => ({
      id: doc.id, // including id separately because doc.data() dooesn't contain the doc id
      ...doc.data(),
    }));

    dispatch(fetchBoardsSuccess(boards));
  } catch (error) {
    dispatch(fetchBoardsFailure(error.message));
  }
};

/*

QuerySnapshot Structure:
docs: An array of all the documents matching the query, each represented as a QueryDocumentSnapshot.
empty: A boolean indicating whether the QuerySnapshot is empty (i.e., contains no documents).
size: The number of documents in the QuerySnapshot.
forEach(callback): Iterates over each QueryDocumentSnapshot in the docs array, executing the provided callback function for each document.

DocumentSnapshot Structure:
id: The unique identifier (document ID) for the document within its collection.
exists: A boolean indicating whether the document exists in the database.
ref: A DocumentReference pointing to the document's location in the database.
data(): A method that retrieves all fields in the document as an object. Returns undefined if the document doesn't exist.
get(fieldPath): Retrieves the value of a specific field defined by fieldPath.

*/

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
    const boardRef = doc(db, "boards", boardId);
    await deleteDoc(boardRef);
    dispatch(deleteBoardSuccess(boardId));
  } catch (error) {
    console.error("Error deleting board:", error);
  }
};
