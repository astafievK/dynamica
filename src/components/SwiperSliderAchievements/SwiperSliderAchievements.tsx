import {FC} from "react";
import {Swiper, SwiperSlide} from "swiper/react";

interface ISlideProps {
    imagePath: string;
    title: string;
}

interface ISwiperSliderAchievementsProps {
    data?: ISlideProps[];
}

export const SwiperSliderAchievements: FC<ISwiperSliderAchievementsProps> = () => {
    return(
        <Swiper
            loop={true}
            grabCursor={true}
            centeredSlides={true}
            effect="slide"
            breakpoints={{
                320: {
                    slidesPerView: 1.5,
                    spaceBetween: 6,
                },
                768: {
                    slidesPerView: 1.5,
                    spaceBetween: 15,
                },
                1024: {
                    slidesPerView: 3.5,
                    spaceBetween: 15,
                },
                1440: {
                    slidesPerView: 3.5,
                    spaceBetween: 25,
                },
            }}
        >
            <SwiperSlide>
                <div className="content">
                    <div className="image-wrapper">
                        <img loading={"lazy"} src={"/landing-preview-photo.png"} alt={""} />
                    </div>
                    <div className={"label"}>Мы молодцы</div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="content">
                    <div className="image-wrapper">
                        <img loading={"lazy"} src={"/landing-preview-photo.png"} alt={""} />
                    </div>
                    <div className={"label"}>Мы молодцы</div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="content">
                    <div className="image-wrapper">
                        <img loading={"lazy"} src={"/landing-preview-photo.png"} alt={""} />
                    </div>
                    <div className={"label"}>Мы молодцы</div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="content">
                    <div className="image-wrapper">
                        <img loading={"lazy"} src={"/landing-preview-photo.png"} alt={""} />
                    </div>
                    <div className={"label"}>Мы молодцы</div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="content">
                    <div className="image-wrapper">
                        <img loading={"lazy"} src={"/landing-preview-photo.png"} alt={""} />
                    </div>
                    <div className={"label"}>Мы молодцы</div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="content">
                    <div className="image-wrapper">
                        <img loading={"lazy"} src={"/landing-preview-photo.png"} alt={""} />
                    </div>
                    <div className={"label"}>Мы молодцы</div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="content">
                    <div className="image-wrapper">
                        <img loading={"lazy"} src={"/landing-preview-photo.png"} alt={""} />
                    </div>
                    <div className={"label"}>Мы молодцы</div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="content">
                    <div className="image-wrapper">
                        <img loading={"lazy"} src={"/landing-preview-photo.png"} alt={""} />
                    </div>
                    <div className={"label"}>Мы молодцы</div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="content">
                    <div className="image-wrapper">
                        <img loading={"lazy"} src={"/landing-preview-photo.png"} alt={""} />
                    </div>
                    <div className={"label"}>Мы молодцы</div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="content">
                    <div className="image-wrapper">
                        <img loading={"lazy"} src={"/landing-preview-photo.png"} alt={""} />
                    </div>
                    <div className={"label"}>Мы молодцы</div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="content">
                    <div className="image-wrapper">
                        <img loading={"lazy"} src={"/landing-preview-photo.png"} alt={""} />
                    </div>
                    <div className={"label"}>Мы молодцы</div>
                </div>
            </SwiperSlide>
        </Swiper>
    )
}