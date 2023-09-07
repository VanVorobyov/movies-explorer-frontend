import { useState, useEffect } from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import useValidation from '../../utils/hooks/useValidation';

const Register = (props) => {
  const { onRegister, isLoading, isLoggedIn } = props;
  const { values, handleChange, resetForm, isValid, isDisabled, errors } = useValidation({ name: '', email: '', password: '' });

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values.name, values.email, values.password);
  }

  useEffect(() => {
    if (isLoggedIn) resetForm();
  }, [isLoggedIn, resetForm]);

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
          loadingText={`Регистрация...`}
          buttonText={`Зарегистрироваться`}
          link={`/signin`}
          text={`Уже зарегистрированы?`}
          linkText={`Войти`}
        >
          <FormInput
            name={`name`}
            title={`Имя`}
            value={values.name}
            isValid={isValid}
            onChange={handleChange}
            errors={errors.name}
          />
          <FormInput
            name={`email`}
            title={`E-mail`}
            value={values.email}
            isValid={isValid}
            onChange={handleChange}
            errors={errors.email}
          />
          <FormInput
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
