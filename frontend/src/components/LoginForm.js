import React, { Component, useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

import '../App.css';
import axios from "axios";

const LoginForm = ({ login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()

    login(email, password);
  };

  // authenication
  // redirection

  return (
    <div className='container mt-5'>
      <h1>Login</h1>
      <form onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            className='form-control'
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            minLength='6'
            required
          />
        </div>
        <button className='btn btn-primary' type='submit'>Login</button>
      </form>
      <p>Don't have an account with us? <Link to='/signup'>Sign up</Link></p>
    </div>
  );
};

// const mapStateToProps = state => ({

// });

export default connect(null, { login })(LoginForm);