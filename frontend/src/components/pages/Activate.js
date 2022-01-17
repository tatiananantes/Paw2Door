import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from "../../actions/auth";

const Activate = ({ verify, match }) => {

  const [verified, setVerified] = useState(false);

  const verify_account = e => {
    const uid = match.params.uid;
    const token = match.params.token;

    verify(uid, token);
    setVerified(true);
  };

  if (verified) {
    return <Navigate to='/' />
  }

  return (
    <div className='container mt-5'>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1>Account Verification</h1>
        <button
          onClick={verify_account}
          className="btn btn-primary btn-lg mt-4"
          type="button"
          >
          Verify
        </button>
      </div>
    </div>
  );
};

export default connect(null, { verify })(Activate);