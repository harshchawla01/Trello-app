import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Landing from "./components/Layout/Landing";

const App = () => {
  return (
    <div>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <Landing />
        </div>
      </Router>
    </div>
  );
};

export default App;
