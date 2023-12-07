import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from "../NavBar";
import Home from '../../Pages/Home';
import ErrorPage from "../../Pages/ErrorPage/index";

function RouterIndex () {
    return (
        <Router>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    )
}

export default RouterIndex