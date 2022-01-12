import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Modal from "./components/Modal";
import axios from "axios";
import SignUp from './components/pages/SignUp'

class App extends Component {
  render() {
    return (
      <>
      <Router>
        <Routes>
            <Route path='/' element={<SignUp/>} />
            <Route path='/signup' element={<SignUp/>} />
        </Routes>
      </Router>
      </>
    );
  };
};

export default App;
