import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import useLocation
import About from './components/About';
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Game from './components/Game'; // Import your Game component

function App() {
  const [showNavbarAndFooter, setShowNavbarAndFooter] = useState(true);
  return (
    <Router>
      <div className="App">
        {showNavbarAndFooter && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/game"
            element={<Game setShowNavbarAndFooter={setShowNavbarAndFooter} />}
          />
        </Routes>
        {showNavbarAndFooter && <Footer />}
      </div>
    </Router>
  );
}

export default App;
