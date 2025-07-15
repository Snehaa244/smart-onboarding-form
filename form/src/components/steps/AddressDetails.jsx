import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateField,
  goToNextStep,
  goToPreviousStep,
  setError,
  clearError,
} from '../../redux/formSlice';

import { countryStateMap } from '../../constants/countryStateMap';
import { cityMap } from '../../constants/cityMap';
import FormLayout from '../layout/FormLayout';

const Step2_AddressDetails = () => {
  const dispatch = useDispatch();
  const { addressDetails, errors } = useSelector((state) => state.form);
  const [localData, setLocalData] = useState(addressDetails);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Load states when country changes
  useEffect(() => {
    const st = countryStateMap[localData.country] || [];
    setStates(st);
    if (!st.includes(localData.state)) {
      setLocalData((prev) => ({ ...prev, state: '', city: '' }));
      dispatch(updateField({ section: 'addressDetails', field: 'state', value: '' }));
      dispatch(updateField({ section: 'addressDetails', field: 'city', value: '' }));
    }
  }, [localData.country]);

  // Load cities when state changes
  useEffect(() => {
    const ct = cityMap[localData.state] || [];
    setCities(ct);
    if (!ct.includes(localData.city)) {
      setLocalData((prev) => ({ ...prev, city: '' }));
      dispatch(updateField({ section: 'addressDetails', field: 'city', value: '' }));
    }
  }, [localData.state]);

  // Field-wise validation
  useEffect(() => {
    const { country, state, city, zip } = localData;

    if (!country) {
      dispatch(setError({ field: 'country', message: 'Country is required' }));
    } else {
      dispatch(clearError('country'));
    }

    if (!state) {
      dispatch(setError({ field: 'state', message: 'State is required' }));
    } else {
      dispatch(clearError('state'));
    }

    if (!city) {
      dispatch(setError({ field: 'city', message: 'City is required' }));
    } else {
      dispatch(clearError('city'));
    }

    if (country === 'India' && !/^\d{6}$/.test(zip)) {
      dispatch(setError({ field: 'zip', message: 'Zip must be 6 digits for India' }));
    } else if (country === 'USA' && !/^\d{5}$/.test(zip)) {
      dispatch(setError({ field: 'zip', message: 'Zip must be 5 digits for USA' }));
    } else if (zip.trim() === '') {
      dispatch(setError({ field: 'zip', message: 'Zip code is required' }));
    } else {
      dispatch(clearError('zip'));
    }
  }, [localData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
    dispatch(updateField({ section: 'addressDetails', field: name, value }));
  };

  const handleNext = () => {
    dispatch(goToNextStep());
  };

  const handleBack = () => {
    dispatch(goToPreviousStep());
  };

  // Only check for this step’s relevant errors
  const stepFields = ['country', 'state', 'city', 'zip'];
  const canProceed = !stepFields.some((field) => errors[field]);

  return (
    <FormLayout onBack={handleBack} onNext={handleNext} canProceed={canProceed}>
      <h2>Address Details</h2>

      <div className="form-group">
        <label>Country</label>
        <select name="country" value={localData.country} onChange={handleChange}>
          <option value="">Select Country</option>
          {Object.keys(countryStateMap).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.country && <p className="error">{errors.country}</p>}
      </div>

      <div className="form-group">
        <label>State</label>
        <select name="state" value={localData.state} onChange={handleChange}>
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.state && <p className="error">{errors.state}</p>}
      </div>

      <div className="form-group">
        <label>City</label>
        <select name="city" value={localData.city} onChange={handleChange}>
          <option value="">Select City</option>
          {cities.map((ct) => (
            <option key={ct} value={ct}>{ct}</option>
          ))}
        </select>
        {errors.city && <p className="error">{errors.city}</p>}
      </div>

      <div className="form-group">
        <label>Zip Code</label>
        <input name="zip" value={localData.zip} onChange={handleChange} />
        {errors.zip && <p className="error">{errors.zip}</p>}
      </div>
    </FormLayout>
  );
};

export default Step2_AddressDetails;
