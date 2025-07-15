import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateReviewField, setStep, goToNextStep } from '../../redux/formSlice';
import FormLayout from '../layout/FormLayout';

const Step6_Review = () => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const editableSections = [
    { key: 'userDetails', title: 'User Details' },
    { key: 'addressDetails', title: 'Address Details' },
    { key: 'employmentDetails', title: 'Employment Details' },
    { key: 'preferences', title: 'Preferences' },
    { key: 'paymentDetails', title: 'Payment Details' }
  ];

  const handleChange = (section, field, value) => {
    dispatch(updateReviewField({ section, field, value }));
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      dispatch(goToNextStep()); // Goes to Submitted step (step 7)
      localStorage.removeItem('smartFormData');
    }, 2000);
  };

  const handleBack = () => {
    dispatch(setStep(5));
  };

  const allValid = Object.keys(form.errors).length === 0;

  if (submitted) {
    return null; // Do not render anything if Submitted.jsx is handling the view
  }

  return (
    <FormLayout
      onBack={handleBack}
      onNext={handleSubmit}
      canProceed={allValid && !submitting}
      nextLabel="Submit"
    >
      <h2>Review & Submit</h2>

      {editableSections.map((section) => (
        <div className="form-group review-group" key={section.key}>
          <h4>{section.title}</h4>
          {Object.entries(form[section.key]).map(([field, value]) => (
            <div className="review-field" key={field}>
              <label>{field}:</label>
              <input
                type="text"
                value={value}
                onChange={(e) => handleChange(section.key, field, e.target.value)}
              />
            </div>
          ))}
        </div>
      ))}

      {/*  Submitting message below buttons */}
      {submitting && (
        <div style={{ marginTop: '1rem', textAlign: 'center', color: '#555' }}>
          <p>⏳ Submitting... Please wait</p>
        </div>
      )}
    </FormLayout>
  );
};

export default Step6_Review;
