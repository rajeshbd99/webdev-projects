import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";


import sliderImg1 from '../../src/assets/Career-Counselling-in-India-via-online_1.jpg'
import sliderImg2 from '../../src/assets/0_T_8bPAA-yojvbxOA-1-1.jpg'
import sliderImg3 from '../../src/assets/what-is-career-counselling.jpg'

import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const Slider = () => {
    const slides = [
      {
        id: 1,
        title: "Achieve Career Excellence",
        description: "Explore personalized career guidance to unlock your potential.",
        img: sliderImg1,
        button: "Get Started",
    },
    {
        id: 2,
        title: "Plan Your Future Today",
        description: "Find the right path with expert advice and planning tools.",
        img: sliderImg2,
        button: "Learn More",
    },
    {
        id: 3,
        title: "Master In-Demand Skills",
        description: "Upgrade your skills to meet the demands of tomorrow's job market.",
        img: sliderImg3,
        button: "Explore Courses",
    },    
    ];

    const navigate = useNavigate();

    return (
        <div className="w-full max-w-[1100px] mx-auto my-4 md:my-6">
            <Swiper
                modules={[Navigation, Pagination, EffectFade, Autoplay]}
                effect="fade"
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                className="rounded-lg shadow-lg"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative">
                            <img
                                src={slide.img}
                                alt={slide.title}
                                className="w-full h-64 md:h-96 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-blue-900 bg-opacity-60 flex flex-col justify-center items-center text-center px-4">
                                <h2 className="text-white text-2xl md:text-4xl font-bold mb-2">
                                    {slide.title}
                                </h2>
                                <p className="text-gray-200 text-sm md:text-lg mb-4">
                                    {slide.description}
                                </p>
                                <button
                                    onClick={() => navigate('/services')}
                                    className="px-6 py-2 bg-white text-black font-semibold rounded-md shadow-md hover:bg-gray-200 transition">
                                    {slide.button}
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;