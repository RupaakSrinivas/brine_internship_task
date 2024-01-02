/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Template from "./pages/Template";
import GuardedRoute from "./components/GaurdedRoute";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import Register from "./pages/RegisterPage";
import ProductPage from "./pages/ProductPage";
import { useUser, UserData } from "./context";
import Cart from "./pages/Cart";
import FavoritesPage from "./pages/FavoritesPage";

const App: React.FC = () => {
  const { login } = useUser();
  
  useEffect(() => {
    document.title = "E-Commerce";
    const storedUserData = localStorage.getItem("user");

    if (storedUserData) {
      const userData: UserData = JSON.parse(storedUserData);
      login(userData);
    }
  }, []);

  return (
    <Router >
      <Template>
        <Routes>
          <Route path="/" element={<GuardedRoute />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/product/:id" element={<ProductPage />}></Route>
            <Route path="/yourfavorites" element={<FavoritesPage />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Template>
    </Router>
  );
};

export default App;
