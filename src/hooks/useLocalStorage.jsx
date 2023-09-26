import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const getValue = () => {
    const item = localStorage.getItem(key);
    if (item && item !== 'undefined') {
      return JSON.parse(item);
    }
    return initialValue;
  };

  const [value, setValue] = useState(getValue);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
export default useLocalStorage;
