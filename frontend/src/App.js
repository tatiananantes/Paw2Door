import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Activate from './components/pages/Activate';
import Pets from './components/pages/Pets';
import Shelter from './components/pages/Shelter';
import PetProfile from './components/pages/PetProfile';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import store from './store';
import Layout from "./hocs/Layout";

const App = () => (
  <Provider store={store}>
    <Router>
    <Navbar />
      <Layout>
          <Routes>
            <Route path='/' element={<Pets/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/activate/:uid/:token' element={<Activate/>} />
            <Route path='/shelter/:id' element={<Shelter/>} />
            <Route path='/pet/:id' element={<PetProfile/>} />
          </Routes>
      </Layout>
    </Router>
  </Provider>
);

export default App;
