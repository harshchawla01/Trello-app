import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { loginSuccess } from "./redux/reducers/authReducer";
import { ClipLoader } from "react-spinners";

import Header from "./components/Layout/Header";
import Landing from "./components/Layout/Landing";
import BoardList from "./components/Board/BoardList";
import ListContainer from "./components/List/ListContainer";
import PrivateRoute from "./components/Auth/PrivateRoute";

function App() {
  const dispatch = useDispatch();
  // const [authChecked, setAuthChecked] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          loginSuccess({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        );
      }
      // setAuthChecked(true);
    });

    return () => unsubscribe();
  }, [dispatch]);

  // if (!authChecked) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <ClipLoader size={50} color="#3B82F6" />
  //     </div>
  //   );
  // }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/boards" replace /> : <Landing />}
            />
            <Route element={<PrivateRoute />}>
              <Route path="/boards" element={<BoardList />} />
              <Route path="/boards/:boardId" element={<ListContainer />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
