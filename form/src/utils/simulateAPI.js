// Simulate API submission with delay
export const submitToFakeAPI = (formData) => {
  return new Promise((resolve) => {
    console.log("Sending form to fake API:", formData);
    setTimeout(() => {
      resolve({ success: true });
    }, 2000); // 2s delay
  });
};
