import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateField,
  goToNextStep,
  goToPreviousStep,
  setError,
  clearError,
} from '../../redux/formSlice';

import { isFutureDate, isValidCVV } from '../../utils/validators';
import FormLayout from '../layout/FormLayout';

const Step5_Payment = () => {
  const dispatch = useDispatch();
  const { paymentDetails, errors } = useSelector((state) => state.form);
  const [localData, setLocalData] = useState(paymentDetails);

  useEffect(() => {
    const { cardNumber, expiryDate, cvv } = localData;

    // Card Number validation
    if (!cardNumber || cardNumber.trim() === '') {
      dispatch(setError({ field: 'cardNumber', message: 'Card number is required' }));
    } else if (cardNumber.startsWith('9999')) {
      dispatch(setError({ field: 'cardNumber', message: 'Invalid card number (starts with 9999)' }));
    } else {
      dispatch(clearError('cardNumber'));
    }

    // Expiry Date validation
    if (!expiryDate) {
      dispatch(setError({ field: 'expiryDate', message: 'Expiry date required' }));
    } else if (!isFutureDate(expiryDate)) {
      dispatch(setError({ field: 'expiryDate', message: 'Card is expired' }));
    } else {
      dispatch(clearError('expiryDate'));
    }

    // CVV validation
    if (!cvv) {
      dispatch(setError({ field: 'cvv', message: 'CVV required' }));
    } else if (!isValidCVV(cvv)) {
      dispatch(setError({ field: 'cvv', message: 'CVV must be 3 digits' }));
    } else {
      dispatch(clearError('cvv'));
    }

  }, [localData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
    dispatch(updateField({ section: 'paymentDetails', field: name, value }));
  };

  const handleNext = () => {
    dispatch(goToNextStep());
  };

  const handleBack = () => {
    dispatch(goToPreviousStep());
  };

  // Only block Next if payment-related errors exist
  const requiredFields = ['cardNumber', 'expiryDate', 'cvv'];
  const canProceed = requiredFields.every((field) => !errors[field]);

  return (
    <FormLayout onBack={handleBack} onNext={handleNext} canProceed={canProceed}>
      <h2>Payment Details</h2>

      <div className="form-group">
        <label>Card Number</label>
        <input
          type="text"
          name="cardNumber"
          value={localData.cardNumber}
          onChange={handleChange}
        />
        {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
      </div>

      <div className="form-group">
        <label>Expiry Date</label>
        <input
          type="date"
          name="expiryDate"
          value={localData.expiryDate}
          onChange={handleChange}
        />
        {errors.expiryDate && <p className="error">{errors.expiryDate}</p>}
      </div>

      <div className="form-group">
        <label>CVV</label>
        <input
          type="password"
          name="cvv"
          value={localData.cvv}
          onChange={handleChange}
          maxLength="3"
        />
        {errors.cvv && <p className="error">{errors.cvv}</p>}
      </div>
    </FormLayout>
  );
};

export default Step5_Payment;
