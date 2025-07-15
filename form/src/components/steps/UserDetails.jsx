import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  updateField,
  goToNextStep,
  setError,
  clearError,
} from '../../redux/formSlice';

import { isValidDate, getAge } from '../../utils/dateUtils';
import { useDebounce } from '../../hooks/useDebounce';
import FormLayout from '../layout/FormLayout';

const Step1_UserDetails = () => {
  const dispatch = useDispatch();
  const { userDetails, meta, errors } = useSelector((state) => state.form);
  const [localData, setLocalData] = useState(userDetails);

  const debouncedData = useDebounce(localData, 300);

  useEffect(() => {
    const { fullName, email, dob } = debouncedData;

    // Full Name validation
    if (!fullName.trim()) {
      dispatch(setError({ field: 'fullName', message: 'Full name is required' }));
    } else {
      dispatch(clearError('fullName'));
    }

    // Email validation
    if (!email.includes('@')) {
      dispatch(setError({ field: 'email', message: 'Invalid email format' }));
    } else if (meta.uniqueEmails.includes(email)) {
      dispatch(setError({ field: 'email', message: 'Email already exists' }));
    } else {
      dispatch(clearError('email'));
    }

    // DOB validation
    if (!isValidDate(dob)) {
      dispatch(setError({ field: 'dob', message: 'Enter a valid date' }));
    } else if (getAge(dob) < 18) {
      dispatch(setError({ field: 'dob', message: 'Must be at least 18 years old' }));
    } else {
      dispatch(clearError('dob'));
    }
  }, [debouncedData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
    dispatch(updateField({ section: 'userDetails', field: name, value }));
  };

  const handleNext = () => {
    dispatch(goToNextStep());
  };

  // Only block Next if any of the current step’s fields have errors
  const requiredFields = ['fullName', 'email', 'dob'];
  const canProceed = requiredFields.every((field) => !errors[field]);

  return (
    <FormLayout onBack={() => {}} onNext={handleNext} canProceed={canProceed}>
      <h2>User Details</h2>

      <div className="form-group">
        <label>Full Name</label>
        <input
          name="fullName"
          value={localData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <p className="error">{errors.fullName}</p>}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          name="email"
          value={localData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={localData.dob}
          onChange={handleChange}
        />
        {errors.dob && <p className="error">{errors.dob}</p>}
      </div>
    </FormLayout>
  );
};

export default Step1_UserDetails;
