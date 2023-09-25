import { useState, useEffect } from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import useValidation from '../../hooks/useValidation';

const Register = (props) => {
  const { onRegister, isLoading, isLoggedIn, isApiError, setIsApiError } = props;
  const { values, handleChange, resetForm, isValid, isDisabled, errors } = useValidation({ name: '', email: '', password: '' });

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values.name, values.email, values.password);
  }

  useEffect(() => {
    if (isLoggedIn) resetForm();
  }, [isLoggedIn, resetForm]);

  useEffect(() => {
    setIsApiError('');
  }, []);

  return (
    <main>
      <section className="register">
        <Form
          title={`Добро пожаловать!`}
          name={`signup`}
          onSubmit={handleSubmit}
          isValid={isValid}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          isApiError={isApiError}
          setIsApiError={setIsApiError}
          loadingText={`Регистрация...`}
          buttonText={`Зарегистрироваться`}
          link={`/signin`}
          text={`Уже зарегистрированы?`}
          linkText={`Войти`}
        >
          <FormInput
            isLoading={isLoading}
            name={`name`}
            title={`Имя`}
            value={values.name}
            isValid={isValid}
            onChange={handleChange}
            errors={errors.name}
          />
          <FormInput
            isLoading={isLoading}
            name={`email`}
            title={`E-mail`}
            value={values.email}
            isValid={isValid}
            onChange={handleChange}
            errors={errors.email}
          />
          <FormInput
            isLoading={isLoading}
            name={`password`}
            title={`Пароль`}
            value={values.password}
            isValid={isValid}
            onChange={handleChange}
            errors={errors.password}
          />
        </Form>
      </section>
    </main>
  );
};

export default Register;
