import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Form from './Form';
import LandingPage from './LandingPage';
import Login from './Login';
import Signup from './Signup';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />

        <div className="container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/form" element={<Form />} />
        </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}
  
export default App;