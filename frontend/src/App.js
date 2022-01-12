import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import SignUp from './components/pages/SignUp'
import Login from './components/pages/Login'
import Pets from './components/pages/Pets'
import Shelter from './components/pages/Shelter'

class App extends Component {
  render() {
    return (
      <>
      <Router>
        <Routes>
            <Route path='/' element={<Pets/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/shelter/:id' element={<Shelter/>} />
        </Routes>
      </Router>
      </>
    );
  };
};

export default App;
