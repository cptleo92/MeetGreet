import React from 'react';
import { useNavigate } from 'react-router-dom';

function Missing() {
  const navigate = useNavigate();

  return (
    <div className="missing body">
      <div className="missing-text">
        <h2>Our deepest apologies!</h2>
        <p>We couldn't find the page you're looking for.</p>
        <a onClick={() => navigate(-1)}>Click here to go back to where you were.</a>
      </div>
    </div>
  );
}

export default Missing;