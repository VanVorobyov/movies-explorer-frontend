import { useState, useCallback } from 'react';

function useValidation(initialValues) {
  const [values, setValues] = useState(initialValues || { name: '', email: '' });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    const form = e.target.closest('form');
    setIsValid(form.checkValidity());
    setIsDisabled(!form.checkValidity());

    if (name === 'email') {
      const emailPattern = /^[a-zA-Z0-9._%+\-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
      const isValidEmail = emailPattern.test(value);
      setErrors({ ...errors, [name]: isValidEmail ? '' : 'Неправильный формат email' });
      setIsValid(isValidEmail);
      setIsDisabled(isValidEmail);
    }
  };
  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false, newIsDisabled = true) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
    setIsDisabled(newIsDisabled);
  }, []);

  return { values, errors, isValid, isDisabled, handleChange, resetForm };
}
export default useValidation;
