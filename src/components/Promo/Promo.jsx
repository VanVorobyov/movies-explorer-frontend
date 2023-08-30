import React from 'react';
import './Promo.css';
import promo_logo from '../../images/promo__logo.svg';

const Promo = () => {
  return (
    <div className="promo">
      <div className="promo__content">
        <div className="promo__text-wrap">
          <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <a
            href="#about-project"
            className="promo__button"
          >
            Узнать больше
          </a>
        </div>
        <img
          className="promo__img"
          alt="Логотип промо"
          src={promo_logo}
        />
      </div>
    </div>
  );
};

export default Promo;
