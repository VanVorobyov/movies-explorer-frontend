import React from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';

const Login = (props) => {
  const { onSubmit, isValid, isDisabled, isLoading } = props;

  return (
    <>
      <Form
        title={`Рады видеть!`}
        onSubmit={onSubmit}
        name={`signin`}
        isValid={isValid}
        isDisabled={isDisabled}
        isLoading={isLoading}
        loadingText={`Войти...`}
        buttonText={`Войти`}
        link={`/signup`}
        text={`Ещё не зарегистрированы?`}
        linkText={`Регистрация`}
      >
        <FormInput
          name={`email`}
          title={`E-mail`}
        />
        <FormInput
          name={`password`}
          title={`Пароль`}
        />
      </Form>
    </>
  );
};

export default Login;
