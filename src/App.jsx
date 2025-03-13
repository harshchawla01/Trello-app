import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { loginSuccess } from "./redux/reducers/authReducer";

// Components
import Header from "./components/Layout/Header";
import Landing from "./components/Layout/Landing";
import BoardList from "./components/Board/BoardList";
import PrivateRoute from "./components/Auth/PrivateRoute";

const App = () => {
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
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/boards" replace /> : <Landing />}
            />
            <Route element={<PrivateRoute />}>
              <Route path="/boards" element={<BoardList />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
