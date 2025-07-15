import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { rollback } from '../redux/formSlice';

export const useUndo = (enabled = true) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!enabled) return;

    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        dispatch(rollback());
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [enabled, dispatch]);
};
