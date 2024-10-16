import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Form from './Form';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />

        <div className="container">
        <Routes>
          <Route path="/" element={<Form />} />
        </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}
  
export default App;