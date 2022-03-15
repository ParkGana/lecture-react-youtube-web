import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div>
        <Router>
          <Routes>
            <Route exact path element />
          </Routes>
        </Router>
      </div>
    </Suspense>
  );
}

export default App;