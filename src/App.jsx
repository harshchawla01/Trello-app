import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Landing from "./components/Layout/Landing";

const App = () => {
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
