import React from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';

const Register = (props) => {
  const { onSubmit, isValid, isDisabled, isLoading } = props;
  return (
    <main>
      <section className="register">
        <Form
          title={`Добро пожаловать!`}
          onSubmit={onSubmit}
          name={`signup`}
          isValid={isValid}
          isDisabled={isDisabled}
          isLoading={isLoading}
          loadingText={`Регистрация...`}
          buttonText={`Зарегистрироваться`}
          link={`/signin`}
          text={`Уже зарегистрированы?`}
          linkText={`Войти`}
        >
          <FormInput
            name={`name`}
            title={`Имя`}
          />
          <FormInput
            name={`email`}
            title={`E-mail`}
          />
          <FormInput
            name={`password`}
            title={`Пароль`}
          />
        </Form>
      </section>
    </main>
  );
};

export default Register;
