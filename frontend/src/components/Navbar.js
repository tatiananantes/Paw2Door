import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth';
import { useSelector } from 'react-redux'

const Navbar = () => {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated) 

  const guestLinks = () => (
    <Fragment>
       <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
       </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup">Sign up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup">{JSON.stringify()}</Link>
        </li>
    </Fragment>
  );

  const authLinks = () => (
    <Fragment>
      <li className="nav-item">
          <a className="nav-link" href="#!" onClick={logout}>Logout</a>
      </li>
      <li className="nav-item">
          <a className="nav-link" href={`/shelter/${localStorage.getItem('userId')}`}>My Shelter</a>
      </li>
      <li className="nav-item">
          <Link className="nav-link" to="/signup">{JSON.stringify()}</Link>
        </li>
    </Fragment>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Paw2Door</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
          {isAuthenticated ? authLinks() : guestLinks()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
