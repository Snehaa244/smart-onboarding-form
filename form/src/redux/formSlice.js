import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 1,

  userDetails: {
    fullName: '',
    email: '',
    dob: ''
  },

  addressDetails: {
    country: '',
    state: '',
    city: '',
    zip: ''
  },

  employmentDetails: {
    occupation: '',
    experience: '',
    currentlyWorking: ''
  },

  preferences: {
    selected: [],
    other: '',
    discountCode: ''
  },

  paymentDetails: {
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  },

  reviewData: {},
  errors: {},

  // Removed history for undo
  skipPreferences: {
    skip: false
  },

  meta: {
    uniqueEmails: ['test@mail.com', 'sneha@adobe.com']
  }
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { section, field, value } = action.payload;
      state[section][field] = value;
    },

    updateReviewField: (state, action) => {
      const { section, field, value } = action.payload;
      state[section][field] = value;

      // Reset logic if employment changes
      if (section === 'employmentDetails') {
        state.preferences = {
          selected: [],
          other: '',
          discountCode: ''
        };
        state.paymentDetails = {
          cardNumber: '',
          expiryDate: '',
          cvv: ''
        };
        state.skipPreferences = { skip: false };
      }
    },

    setError: (state, action) => {
      const { field, message } = action.payload;
      state.errors[field] = message;
    },

    clearError: (state, action) => {
      delete state.errors[action.payload];
    },

    goToNextStep: (state) => {
      state.step += 1;
    },

    goToPreviousStep: (state) => {
      if (state.step > 1) state.step -= 1;
    },

    setStep: (state, action) => {
      state.step = action.payload;
    }
  }
});

export const {
  updateField,
  updateReviewField,
  setError,
  clearError,
  goToNextStep,
  goToPreviousStep,
  setStep
} = formSlice.actions;

export default formSlice.reducer;
