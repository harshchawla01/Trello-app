import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/config";
// import axios from "axios"; // Added missing import
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from "../reducers/authReducer";

export const loginWithGoogle = () => async (dispatch) => {
  try {
    dispatch(loginStart());
    const result = await signInWithPopup(auth, googleProvider);

    let profilePicURL = result.user.photoURL;

    // we cab use the photoURL directly coz google profile pictures are already accessible
    dispatch(
      loginSuccess({
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: profilePicURL,
      })
    );
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(logout());
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
