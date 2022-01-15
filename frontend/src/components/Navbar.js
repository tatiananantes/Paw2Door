import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth';
import { connect } from 'react-redux'

const Navbar = ({ logout, isAuthenticated }) => {
  const guestLinks = () => (
    <Fragment>
       <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
       </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup">Sign up</Link>
        </li>
    </Fragment>
  );

  const authLinks = () => (
    <div>
      <li className="nav-item">
          <a className="nav-link" href="#!" onClick={logout}>Logout</a>
      </li>
    </div>
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);