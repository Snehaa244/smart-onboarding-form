import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateField,
  goToNextStep,
  goToPreviousStep,
  setError,
  clearError,
} from '../../redux/formSlice';

import { preferenceOptions } from '../../constants/options';
import FormLayout from '../layout/FormLayout';

const Step4_Preferences = () => {
  const dispatch = useDispatch();
  const { preferences, errors, skipPreferences } = useSelector((state) => state.form);
  const [selected, setSelected] = useState(preferences.selected || []);
  const [otherInput, setOtherInput] = useState(preferences.other || '');

  // Handle checkbox updates
  const toggleOption = (option) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  useEffect(() => {
    dispatch(updateField({ section: 'preferences', field: 'selected', value: selected }));

    // Discount logic
    if (selected.includes('AI Services') && selected.includes('SaaS Tools')) {
      dispatch(updateField({ section: 'preferences', field: 'discountCode', value: 'AI-SAVE20' }));
    } else {
      dispatch(updateField({ section: 'preferences', field: 'discountCode', value: '' }));
    }

    // 'Other' validation
    if (selected.includes('Other')) {
      if (!otherInput.trim()) {
        dispatch(setError({ field: 'other', message: 'Please specify other preference' }));
      } else {
        dispatch(clearError('other'));
        dispatch(updateField({ section: 'preferences', field: 'other', value: otherInput }));
      }
    } else {
      dispatch(clearError('other'));
      dispatch(updateField({ section: 'preferences', field: 'other', value: '' }));
    }
  }, [selected, otherInput]);

  const handleNext = () => {
    dispatch(goToNextStep());
  };

  const handleBack = () => {
    dispatch(goToPreviousStep());
  };

  const canProceed = Object.keys(errors).length === 0;

  // If Step 4 is to be skipped, show message but keep navigation buttons
  if (skipPreferences.skip) {
    return (
      <FormLayout onBack={handleBack} onNext={handleNext} canProceed={true}>
        <h2>Step Skipped</h2>
        <p>This step was skipped because your experience is less than 1 year.</p>
        <p>We've automatically selected the <strong>Beginner Plan</strong> for you.</p>
      </FormLayout>
    );
  }

  return (
    <FormLayout onBack={handleBack} onNext={handleNext} canProceed={canProceed}>
      <h2>Preferences</h2>

      <div className="form-group">
        <label>Select Products/Services</label>
        <div className="checkbox-group">
          {preferenceOptions.map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {selected.includes('Other') && (
        <div className="form-group">
          <label>Please Specify</label>
          <input
            type="text"
            value={otherInput}
            onChange={(e) => setOtherInput(e.target.value)}
          />
          {errors.other && <p className="error">{errors.other}</p>}
        </div>
      )}

      {preferences.discountCode && (
        <div className="form-group success">
          🎉 Discount unlocked: <strong>{preferences.discountCode}</strong>
        </div>
      )}
    </FormLayout>
  );
};

export default Step4_Preferences;
