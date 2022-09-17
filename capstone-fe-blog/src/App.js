import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import AppRouter from "./app-router/AppRouter";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter/>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
