import './Portfolio.css';
import React from 'react';

const Portfolio = () => {
  return (
    <div className="portfolio">
      <div className="portfolio__content">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <a
              href="https://github.com/VanVorobyov/how-to-learn"
              className="portfolio__link"
              target="_blank"
              rel="noreferrer"
            >
              Статичный сайт
            </a>
          </li>
          <li className="portfolio__item">
            <a
              href="https://github.com/VanVorobyov/russian-travel"
              className="portfolio__link"
              target="_blank"
              rel="noreferrer"
            >
              Адаптивный сайт
            </a>
          </li>
          <li className="portfolio__item">
            <a
              href="https://github.com/VanVorobyov/react-mesto-api-full-gha"
              className="portfolio__link"
              target="_blank"
              rel="noreferrer"
            >
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Portfolio;
