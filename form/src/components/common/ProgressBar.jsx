import React from 'react';
import { useSelector } from 'react-redux';
import '../../css/progressbar.css';

const steps = [
  'User Details',
  'Address',
  'Employment',
  'Preferences',
  'Payment',
  'Review',
  'Submitted'
];

const ProgressBar = () => {
  const currentStep = useSelector((state) => state.form.step);

  return (
    <div className="progressbar-container">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep || (stepNumber === 7 && currentStep === 7);
        const isActive = stepNumber === currentStep;

        return (
          <div
            key={label}
            className={`step-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
          >
            <div className="step-circle">
              {isCompleted ? '✓' : stepNumber}
            </div>
            <p className="step-label">{label}</p>
            {/* Show line only if not the last step */}
            {index !== steps.length - 1 && <div className="step-line" />}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
