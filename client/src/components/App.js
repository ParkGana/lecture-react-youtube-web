import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./views/Navbar/Navbar";
import Footer from "./views/Footer/Footer";
import LandingPage from './views/Landing/LandingPage';
import SigninPage from './views/User/SigninPage';
import SignupPage from './views/User/SignupPage';
import VideoUploadPage from './views/Video/VideoUploadPage';
import VideoDetailPage from './views/Video/VideoDetailPage';
import SubscribePage from './views/Video/SubscribePage';
import MyPage from './views/User/MyPage';


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
              <Route exact path="/my" element={<MyPage />} />
              <Route exact path="/video/upload" element={<VideoUploadPage />} />
              <Route exact path="/video/:videoId" element={<VideoDetailPage />} />
              <Route exact path="/subscribe" element={<SubscribePage />} />
            </Routes>
          <Footer />
        </Router>
      </div>
    </Suspense>
  );
}

export default App;