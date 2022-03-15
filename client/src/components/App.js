import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./views/Navbar/Navbar";
import Footer from "./views/Footer/Footer";
import LandingPage from './views/Landing/LandingPage';
import SigninPage from './views/User/SigninPage';
import SignupPage from './views/User/SignupPage';


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div>
        <Router>
          <Navbar />
            <Routes>
              <Route exact path="/" element={<LandingPage />} />
              <Route exact path="/signin" element={<SigninPage />} />
              <Route exact path="/signup" element={<SignupPage />} />
            </Routes>
          <Footer />
        </Router>
      </div>
    </Suspense>
  );
}

export default App;