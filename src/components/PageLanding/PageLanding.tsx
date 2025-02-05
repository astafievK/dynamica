import {FC} from "react";
import "swiper/css";
import {SwiperSliderAchievements} from "../SwiperSliderAchievements/SwiperSliderAchievements.tsx";
import {pageAnimation} from "../../motionSettins.ts";
import { motion } from "framer-motion";

export const PageLanding: FC = () => {
    return(
        <motion.div
            initial={pageAnimation.initial}
            animate={pageAnimation.animate}
            exit={pageAnimation.exit}
            transition={pageAnimation.transition}
            className="page page-landing">
            <div className="landing-module__preview">
                <div className="photo-container">
                    <h1>Автохолдинг<br/>«Динамика»</h1>
                    <div className="photo-container__item image-container">
                        <img src="landing-preview-photo.png" alt={""}/>
                    </div>
                </div>
            </div>
            <div className="content">
                <section className="section-year">
                    <h2>
                        Работаем<br/>
                        с <span className="year">2009</span> года,<br/>
                        <span className="end">год за годом обретая<br/>доверие тысяч<br/>автовладельцев</span>
                    </h2>
                </section>
                <section className="section-map">
                    <div className="info">
                        <p>
                            <strong>Динамика сегодня — </strong><br/>это 22 бренда в 7 городах России
                        </p>
                        <p className="gray">
                            Большой и слаженный механизм работы 800+ сотрудников нашей компании.
                        </p>
                    </div>
                    <div className="values-container">
                        <h3 className="container-title">Наши ценности:</h3>
                        <div className="values">
                            <div className="value">
                            <span>
                                <span className="title">Движение. </span>
                                Мы обеспечиваем доступность автомобилей и услуг сервиса для наших клиентов. Профессиональный и личностный рост, возможность карьерных изменений - для наших сотрудников.
                            </span>
                            </div>
                            <div className="value">
                            <span>
                                <span className="title">Амбиции. </span>
                                Мы уже добились многого. Мы имеем опыт, знания, компетенции. Поэтому мы ставим амбициозные цели и претендуем на лидерство.
                            </span>
                            </div>
                            <div className="value">
                            <span>
                                <span className="title">Скорость. </span>
                                Мы ценим время. Мы лаконичны в коммуникациях. Соответствуем современному темпу жизни и четко транслируем свою позицию.
                            </span>
                            </div>
                            <div className="value">
                            <span>
                                <span className="title">Импульс. </span>
                                Движение на вершину невозможно без тщательной подготовки, поэтому мы инвестируем в экспертное развитие своих сотрудников, автоматизируем процессы, отслеживаем технологические новшества.
                            </span>
                            </div>
                        </div>
                    </div>
                    <img src={"russia 1.svg"} alt={""}/>
                </section>
                <section className="dynamica-today">
                    <p>
                        <strong>Динамика сегодня — </strong><br/>это 22 бренда в 7 городах России
                    </p>
                    <p className="gray">
                        Большой и слаженный механизм работы 800+ сотрудников нашей компании.
                    </p>
                </section>
                <section className="section-values">
                    <div className="values-container">
                        <h3 className="container-title">Наши ценности:</h3>
                        <div className="values">
                            <div className="value">
                                <span>
                                    <span className="title">Движение. </span>
                                    Мы обеспечиваем доступность автомобилей и услуг сервиса для наших клиентов. Профессиональный и личностный рост, возможность карьерных изменений - для наших сотрудников.
                                </span>
                            </div>
                            <div className="value">
                                <span>
                                    <span className="title">Амбиции. </span>
                                    Мы уже добились многого. Мы имеем опыт, знания, компетенции. Поэтому мы ставим амбициозные цели и претендуем на лидерство.
                                </span>
                            </div>
                            <div className="value">
                                <span>
                                    <span className="title">Скорость. </span>
                                    Мы ценим время. Мы лаконичны в коммуникациях. Соответствуем современному темпу жизни и четко транслируем свою позицию.
                                </span>
                            </div>
                            <div className="value">
                                <span>
                                    <span className="title">Импульс. </span>
                                    Движение на вершину невозможно без тщательной подготовки, поэтому мы инвестируем в экспертное развитие своих сотрудников, автоматизируем процессы, отслеживаем технологические новшества.
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-achievements">
                    <h2>Наши достижения</h2>
                    <SwiperSliderAchievements/>
                </section>
                <section className="section-form">
                    <form id="formReview" action="">
                        <div className="form-picture">
                            <img src="logo-single.svg" alt="" />
                        </div>
                        <div className="form-body__wrapper">
                            <div className="form-header">
                                <span className="primary">Остались вопросы</span>
                                <span className="secondary">или есть пожелания к порталу</span>
                            </div>
                            <div className="form-body">
                                <input className="form-input__name form-elem__text" type="text" placeholder="ФИО" />
                                <textarea className="form-input__description form-elem__text" placeholder="Ваш вопрос/пожелание"></textarea>
                                <div className="submit-container">
                                    <button type="submit" className="form-input__submit">
                                        отправить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </motion.div>
    )
}