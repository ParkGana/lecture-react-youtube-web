import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./views/Navbar/Navbar";
import Footer from "./views/Footer/Footer";


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div>
        <Router>
          <Navbar />
            <Routes>
              <Route exact path element />
            </Routes>
          <Footer />
        </Router>
      </div>
    </Suspense>
  );
}

export default App;