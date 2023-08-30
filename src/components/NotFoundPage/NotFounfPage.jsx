import React from 'react';
import './NotFoundPage.css';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className="error-page">
      <div className="error-page__text-wrap">
        <h1 className="error-page__title">404</h1>
        <p className="error-page__subtitle">Страница не найдена</p>
        <Link
          to="/"
          className="error-page__link"
        >
          Назад
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
