import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./views/Navbar/Navbar";
import Footer from "./views/Footer/Footer";
import LandingPage from './views/Landing/LandingPage';


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div>
        <Router>
          <Navbar />
            <Routes>
              <Route exact path="/" element={<LandingPage />} />
            </Routes>
          <Footer />
        </Router>
      </div>
    </Suspense>
  );
}

export default App;