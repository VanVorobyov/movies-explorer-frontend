import React from 'react';
import './AboutMe.css';
import StudentPhoto from '../../images/ava.jpeg';

const AboutMe = () => {
  return (
    <div className="about-me">
      <div className="about-me__content">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__info-wrapper">
          <div className="about-me__text-wrapper">
            <h2 className="about-me__info-title">Иван</h2>
            <h3 className="about-me__info-subitle">Фронтенд-разработчик</h3>
            <p className="about-me__info-text">
              Привет мир! Большую часть жизни я посвятил работе в социальной сфере с незащищенными категориями населения 👨‍👩‍👧‍👦. После получения среднего
              образования прошел в ВУЗе на специальность "Комплексная защита информации" и "Социальная работа", но выбрал последнюю, так как хотел
              делать мир лучше и развить в себе определённые скиллы по работе с людьми. Сейчас формирую уже технические скиллы. 😄 В свободное время
              играю на гитаре и фортепианно, путешествую по мере возможности, фанатею от технологий, изучаю новое и всегда готов к новым вызовам.💪🤓
            </p>
            <a
              href="https://github.com/VanVorobyov"
              className="about-me__info-link"
              target="_blank"
              rel="noreferrer"
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
    </div>
  );
};

export default AboutMe;
