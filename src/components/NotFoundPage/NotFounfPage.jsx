import React from 'react';
import './NotFoundPage.css';
import { Link, useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <main>
      <section className="error-page">
        <div className="error-page__text-wrap">
          <h1 className="error-page__title">404</h1>
          <p className="error-page__subtitle">Страница не найдена</p>
        </div>
        <Link
          onClick={handleGoBack}
          className="error-page__link"
        >
          Назад
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
