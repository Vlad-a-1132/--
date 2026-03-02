"use client";

import React from "react";
import Slider from "react-slick";

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5500,
    arrows: false,
    fade: true,
    cssEase: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    className: "hero-slider rounded-2xl overflow-hidden shadow-2xl",
    dotsClass: "slick-dots",
  };

  const sliderImages = [
    { src: "/images/ASDASD.webp", alt: "Канцелярские товары" },
    { src: "/images/ASDASDS.webp", alt: "Канцелярия" },
  ];

  return (
    <div className="w-full pt-6 pb-0 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <Slider {...settings}>
          {sliderImages.map((slide, index) => (
            <div key={index} className="relative w-full overflow-hidden aspect-[1280/595]">
              <img
                src={slide.src}
                alt={slide.alt}
                className="hero-slide-image absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SliderComponent;
