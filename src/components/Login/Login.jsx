import { useEffect } from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import useValidation from '../../hooks/useValidation';

const Login = (props) => {
  const { onLogin, isLoading, isLoggedIn, isApiError, setIsApiError } = props;
  const { values, handleChange, resetForm, isValid, isDisabled, errors } = useValidation({ email: '', password: '' });

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values.email, values.password);
  }
  useEffect(() => {
    if (isLoggedIn) resetForm();
  }, [isLoggedIn, resetForm]);

  return (
    <main>
      <section className="login">
        <Form
          title={`Рады видеть!`}
          name={`signin`}
          onSubmit={handleSubmit}
          isValid={isValid}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          isApiError={isApiError}
          setIsApiError={setIsApiError}
          loadingText={`Войти...`}
          buttonText={`Войти`}
          link={`/signup`}
          text={`Ещё не зарегистрированы?`}
          linkText={`Регистрация`}
        >
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

export default Login;
