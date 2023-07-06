"use client"

// import React from "react";
// Import Swiper React components
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import 'swiper/swiper.min.css';
// import 'swiper/components/zoom/zoom.min.css';

// import "./styles.css";

// import required modules
import { Zoom, Navigation, Pagination, FreeMode, Thumbs } from "swiper";
import { useState } from 'react';


const CarouselComponent = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const onThumbClick = (swiper: any) => {
    setThumbsSwiper(swiper);
  }

  return (
    <div className='relative h-full'>
      <Swiper
        // style={{
        //   "--swiper-navigation-color": "#fff",
        //   "--swiper-pagination-color": "#fff",
        // }}
        thumbs={{ swiper: thumbsSwiper }}
        zoom={{
          toggle: true,
          maxRatio: 5,
        }}
        // navigation={true}
        pagination={{
          clickable: true,
        }}

        // modules={[Zoom, Navigation, Pagination]}
        modules={[FreeMode, Zoom, Pagination]}
        className="bigSwiper"
        // spaceBetween={10}
        // slidesPerView={1}
      >
        <SwiperSlide>
            <img src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </SwiperSlide>
      </Swiper>

      <div className='hidden lg:block'>
        <Swiper
          onSwiper={onThumbClick}
          spaceBetween={10}
          slidesPerView={6}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="listSwiper mt-4"
        >
          <SwiperSlide>
            <img src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default CarouselComponent