import React from 'react';
import '../../css/layout.css'; // Make sure this path is correct

const FormLayout = ({ children, onBack, onNext, canProceed, nextLabel = 'Next' }) => {
  return (
    <div className="layout-wrapper">
      <div className="form-box">
        {children}

        <div className="form-navigation">
          {onBack && (
            <button className="nav-btn back-btn" onClick={onBack}>
              Back
            </button>
          )}
          {onNext && (
            <button
              className={`nav-btn next-btn ${!canProceed ? 'disabled' : ''}`}
              onClick={onNext}
              disabled={!canProceed}
            >
              {nextLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
