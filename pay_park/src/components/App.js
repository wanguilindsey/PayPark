import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Form from './Form';

const App = () => {
    return (
      <div className="App">
        <Header />
        
        <div className="container">
          <Form />
        </div>
        
        <Footer />
      </div>
    );
  }
  
  export default App;