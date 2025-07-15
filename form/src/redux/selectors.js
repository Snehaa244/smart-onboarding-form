// Returns current step number
export const selectStep = (state) => state.form.step;

// Returns full form data
export const selectFormData = (state) => ({
  ...state.form.userDetails,
  ...state.form.addressDetails,
  ...state.form.employmentDetails,
  ...state.form.preferences,
  ...state.form.paymentDetails,
});

// Returns all validation errors
export const selectErrors = (state) => state.form.errors;

// Whether user has any errors
export const selectIsFormValid = (state) => Object.keys(state.form.errors).length === 0;
