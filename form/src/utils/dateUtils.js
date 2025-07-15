export const isValidDate = (dateStr) => {
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
};

export const getAge = (dobStr) => {
  const dob = new Date(dobStr);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};
