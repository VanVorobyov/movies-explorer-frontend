import React from 'react';
import './FormInput.css';

const FormInput = (props) => {
  const { name, title, handleChange } = props;

  return (
    <>
      <label
        className={`auth__form-label`}
        htmlFor={`${name}`}
      >
        {title}
      </label>
      <input
        id={`${name}`}
        type={{ name } === 'name' ? 'text' : `${name}`}
        className={`auth__form-input auth__form-input_${name}`}
        placeholder={``}
        name={`${name}-input`}
        autoComplete="new-password"
        required={true}
        minLength="2"
        maxLength="30"
        onChange={handleChange}
        // value={values[this.name] || ''}
      ></input>
      <span className="auth__input-error">Что-то пошло не так...</span>
    </>
  );
};

export default FormInput;
