import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from '../NavBar';
import Home from '../../Pages/Home';
import ViewEmployees from '../../Pages/ViewEmployees';
import ErrorPage from '../../Pages/ErrorPage';

function RouterIndex() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view" element={<ViewEmployees />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default RouterIndex;