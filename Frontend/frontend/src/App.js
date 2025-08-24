import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import VentanaPrincipal from "./Interfaz/ventanas";
import VentanaJuego from "./Interfaz/VentanaJuego";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VentanaPrincipal />} />
        <Route path="/juego" element={<VentanaJuego />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
