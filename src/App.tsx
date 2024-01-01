import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Template from './pages/Template';
import GuardedRoute from './components/GaurdedRoute';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import Register from './pages/RegisterPage';

const App: React.FC = () => {

  return (
    <Router>
      <Template>
        <Routes>
          <Route path="/" element={<GuardedRoute />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
          </Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Template>
    </Router>
  );
};

export default App;