import React from 'react';
import './FormInput.css';

const FormInput = (props) => {
  const { name, title, value, onChange, errors } = props;

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
        type={name === 'name' ? 'text' : name}
        className={`auth__form-input auth__form-input_${name}`}
        placeholder={`Введите ${title}`}
        name={`${name}`}
        autoComplete="off"
        required
        minLength="2"
        maxLength="30"
        onChange={onChange}
        defaultValue={value}
      ></input>
      <span className={`auth__input-error`}>{errors}</span>
    </>
  );
};

export default FormInput;
