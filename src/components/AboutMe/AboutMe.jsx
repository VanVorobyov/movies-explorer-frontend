import React from 'react';
import './AboutMe.css';
import StudentPhoto from '../../images/ava.jpeg';

const AboutMe = () => {
  return (
    <section className="about-me">
      <div className="about-me__content">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__info-wrapper">
          <div className="about-me__text-wrapper">
            <h2 className="about-me__info-title">Иван</h2>
            <h3 className="about-me__info-subitle">Фронтенд-разработчик</h3>
            <p className="about-me__info-text">
              Привет мир! Большую часть жизни я посвятил работе в социальной сфере с незащищенными категориями населения. В ВУЗе поступил на
              специальность "Комплексная защита информации" и "Социальная работа", но выбрал последнюю, так как хотел делать мир лучше и развить в
              себе софт-скиллы. Сейчас формирую уже технические скиллы. В свободное время увлекаюсь музыкой, путешествую, фанатею от технологий,
              изучаю новое и всегда готов к новым вызовам.💪&nbsp;🤓
            </p>

            <a
              href="https://github.com/VanVorobyov"
              target="_blank"
              rel="noreferrer"
              className="about-me__info-link"
            >
              Github
            </a>
          </div>
          <img
            src={StudentPhoto}
            alt="Фотография студента"
            className="about-me__photo"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
