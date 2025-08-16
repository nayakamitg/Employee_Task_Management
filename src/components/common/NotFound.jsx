import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
      navigate('/dashboard');
    };
 

  return (
    <div className="not-found">
      <div className="not-found__content">
        <div className="not-found__graphic">
          <div className="not-found__404">404</div>
          <div className="not-found__circuit"></div>
        </div>
        <h1>Page Not Found</h1>
        <p>Oops! The page you are looking for doesn't exist or you don't have permission to access it.</p>
        <div className="not-found__actions">
          <button onClick={goBack} className="not-found__button not-found__button--secondary">
            <i className="fas fa-arrow-left"></i>
            Go Back
          </button>
          <button onClick={goHome} className="not-found__button not-found__button--primary">
            <i className="fas fa-home"></i>
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
