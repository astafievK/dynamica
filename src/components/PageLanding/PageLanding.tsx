import {FC, useEffect} from "react";
import "swiper/css";
import {SwiperSliderAchievements} from "../SwiperSliderAchievements/SwiperSliderAchievements.tsx";
import {motion} from "framer-motion";
import {AnimatedSection} from "./AnimatedSection.tsx";

export const PageLanding: FC = () => {
    useEffect(() => {
        document.title = "Динамика";
    })

    return (
        <motion.div
            key={"landing"}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{
                duration: 0.6,
                ease: "easeOut",
            }}
            className="page page-landing">
            <div className="landing-module__preview">
                <div className="photo-container">
                    <h1>Автохолдинг<br/>«Динамика»</h1>
                    <div className="photo-container__item image-container">
                        <img loading={"lazy"} src="/landing-preview-photo.png" alt={""}/>
                    </div>
                </div>
            </div>
            <div className="landing-module-wide">
                <div className="image-container">
                    <img loading={"lazy"} src="/landing photo wide.svg" alt={""}/>
                </div>
            </div>
            <div className="content">
                <AnimatedSection>
                    <section className="section-year">
                        <h2>
                            Работаем<br/>
                            с <span className="year">2009</span> года,<br/>
                        </h2>
                        <span className="end">год за годом обретая<br/>доверие тысяч<br/>автовладельцев</span>
                    </section>
                </AnimatedSection>
                <AnimatedSection>
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
                        <img loading={"lazy"} src={"/russia 1.svg"} alt={""}/>
                    </section>
                </AnimatedSection>
                <AnimatedSection>
                    <section className="dynamica-today">
                        <p>
                            <strong>Динамика сегодня — </strong><br/>это 22 бренда в 7 городах России
                        </p>
                        <p className="gray">
                            Большой и слаженный механизм работы 800+ сотрудников нашей компании.
                        </p>
                    </section>
                </AnimatedSection>
                <AnimatedSection>
                    <section className="section-values">
                        <div className="values-container">
                            <span className="container-title">Наши ценности:</span>
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
                </AnimatedSection>
                <AnimatedSection>
                    <section className="section-achievements">
                        <h2>Наши достижения</h2>
                        <SwiperSliderAchievements/>
                    </section>
                </AnimatedSection>
                <AnimatedSection>
                    <section className="section-form">
                        <form id="formReview" action="">
                            <div className="form-picture">
                                <img loading={"lazy"} src="/logo-single.svg" alt=""/>
                            </div>
                            <div className="form-body__wrapper">
                                <div className="form-header">
                                    <span className="primary">Остались вопросы</span>
                                    <span className="secondary">или есть пожелания к порталу</span>
                                </div>
                                <div className="form-body">
                                    <input className="form-input__name form-elem__text" type="text" placeholder="ФИО"/>
                                    <textarea className="form-input__description form-elem__text"
                                              placeholder="Ваш вопрос/пожелание"></textarea>
                                    <div className="submit-container">
                                        <button type="submit" className="form-input__submit">
                                            отправить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </section>
                </AnimatedSection>
            </div>
        </motion.div>
    )
}