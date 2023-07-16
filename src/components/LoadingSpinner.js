import React from 'react';
import logo from '../spinner.svg';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <img src={logo} alt="Loading Arrow" className="app-logo" />
    </div>
  );
};

export default LoadingSpinner;