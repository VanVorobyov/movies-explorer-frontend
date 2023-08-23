import React from 'react';
import './Promo.css';
import promo_logo from '../../images/text__COLOR_landing-logo.svg';

const Promo = () => {
  return (
    <div className="promo">
      <h1 className="promo__title">Учебный проект студента факультета&nbsp;Веб-разработки.</h1>
      <img
        className="promo__img"
        alt="Логотип промо"
        src={promo_logo}
      />
    </div>
  );
};

export default Promo;
