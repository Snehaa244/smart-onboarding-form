export const isFutureDate = (dateStr) => {
  const today = new Date();
  const entered = new Date(dateStr);
  return entered > today;
};

export const isValidCVV = (cvv) => {
  return /^\d{3}$/.test(cvv);
};
