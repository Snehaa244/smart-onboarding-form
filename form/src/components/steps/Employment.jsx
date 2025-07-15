import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateField,
  goToNextStep,
  goToPreviousStep,
  setError,
  clearError,
} from '../../redux/formSlice';
import FormLayout from '../layout/FormLayout';

const Step3_Employment = () => {
  const dispatch = useDispatch();
  const { employmentDetails, errors } = useSelector((state) => state.form);
  const [localData, setLocalData] = useState(employmentDetails);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'experience'
      ? (value === '' ? '' : parseFloat(value))
      : value;

    setLocalData((prev) => ({ ...prev, [name]: parsedValue }));
    dispatch(updateField({ section: 'employmentDetails', field: name, value: parsedValue }));
  };

  // Field-wise validations
  useEffect(() => {
    const { occupation, experience, currentlyWorking } = localData;

    if (!occupation.trim()) {
      dispatch(setError({ field: 'occupation', message: 'Occupation is required' }));
    } else {
      dispatch(clearError('occupation'));
    }

    if (experience === '' || isNaN(experience) || experience < 0) {
      dispatch(setError({ field: 'experience', message: 'Enter valid experience' }));
    } else {
      dispatch(clearError('experience'));
    }

    if (!currentlyWorking) {
      dispatch(setError({ field: 'currentlyWorking', message: 'Select an option' }));
    } else {
      dispatch(clearError('currentlyWorking'));
    }
  }, [localData]);

  const handleNext = () => {
    const { occupation, experience } = localData;

    if (experience < 1) {
      // Beginner flow — skip preferences
      dispatch(updateField({ section: 'preferences', field: 'selected', value: ['Beginner Plan'] }));
      dispatch(updateField({ section: 'preferences', field: 'discountCode', value: '' }));
      dispatch(updateField({ section: 'preferences', field: 'other', value: '' }));
      dispatch(updateField({ section: 'skipPreferences', field: 'skip', value: true }));

      dispatch(goToNextStep()); // Skip Step 4
      dispatch(goToNextStep()); // Move to Step 5
    } else {
      // Normal flow
      dispatch(updateField({ section: 'skipPreferences', field: 'skip', value: false }));

      if (occupation.toLowerCase() === 'developer' && experience > 5) {
        dispatch(updateField({ section: 'preferences', field: 'selected', value: ['Pro Plan'] }));
      }

      dispatch(goToNextStep());
    }
  };

  const handleBack = () => {
    dispatch(goToPreviousStep());
  };

  // Only validate based on local fields, not global form errors
  const stepFields = ['occupation', 'experience', 'currentlyWorking'];
  const canProceed = stepFields.every((field) => !errors[field]);

  return (
    <FormLayout onBack={handleBack} onNext={handleNext} canProceed={canProceed}>
      <h2>Employment Details</h2>

      <div className="form-group">
        <label>Occupation</label>
        <input
          type="text"
          name="occupation"
          value={localData.occupation}
          onChange={handleChange}
        />
        {errors.occupation && <p className="error">{errors.occupation}</p>}
      </div>

      <div className="form-group">
        <label>Years of Experience</label>
        <input
          type="number"
          name="experience"
          min="0"
          value={localData.experience}
          onChange={handleChange}
        />
        {errors.experience && <p className="error">{errors.experience}</p>}
      </div>

      <div className="form-group">
        <label>Currently Working</label>
        <div>
          <label>
            <input
              type="radio"
              name="currentlyWorking"
              value="Yes"
              checked={localData.currentlyWorking === 'Yes'}
              onChange={handleChange}
            /> Yes
          </label>
          <label style={{ marginLeft: '1rem' }}>
            <input
              type="radio"
              name="currentlyWorking"
              value="No"
              checked={localData.currentlyWorking === 'No'}
              onChange={handleChange}
            /> No
          </label>
        </div>
        {errors.currentlyWorking && <p className="error">{errors.currentlyWorking}</p>}
      </div>
    </FormLayout>
  );
};

export default Step3_Employment;
