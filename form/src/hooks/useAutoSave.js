import { useEffect } from 'react';

export const useAutoSave = (state) => {
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem('smartFormData', JSON.stringify(state));
    }, 10000);

    return () => clearInterval(interval);
  }, [state]);
};
