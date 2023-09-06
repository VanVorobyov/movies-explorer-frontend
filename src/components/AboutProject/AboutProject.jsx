import React from 'react';
import './AboutProject.css';

const AboutProject = () => {
  return (
    <section
      className="about-project"
      id="about-project"
    >
      <div className="about-project__content">
        <h2 className="about-project__title">О проекте</h2>
        <ul className="about-project__list">
          <li className="about-project__item">
            <h3 className="about-project__item-title">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__item-text">
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
            </p>
          </li>
          <li className="about-project__item">
            <h3 className="about-project__item-title">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__item-text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <ul className="about-project__timeline">
          <li className="about-project__timeline-item about-project__timeline-item_active">
            <p className="about-project__timeline-item-title about-project__timeline-item-title_active">1 неделя</p>
            <p className="about-project__timeline-item-description">Back-end</p>
          </li>
          <li className="about-project__timeline-item">
            <p className="about-project__timeline-item-title">4 недели</p>
            <p className="about-project__timeline-item-description">Front-end</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default AboutProject;
