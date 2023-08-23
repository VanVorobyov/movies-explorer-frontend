import './Footer.css';
import React from 'react';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <div className="footer__links__content">
          <p className="footer__text">&copy; 2023</p>
          <ul className="footer__list">
            <li className="footer__item">
              <a
                href="https://practicum.yandex.ru/"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__item">
              <a
                href="https://github.com/VanVorobyov"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
