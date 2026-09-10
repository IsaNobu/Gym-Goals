import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/scrollbar";

const BannerSlider = () => {
  return (
    <div>
      <Swiper
        scrollbar={{
          hide: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Scrollbar, Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            className="w-[600px] h-[780px]"
            src="https://i.ibb.co/jJBh1kf/slide-image-1.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-[600px] h-[780px]"
            src="https://i.ibb.co/k0rvpkZ/slide-image-2.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-[600px] h-[780px]"
            src="https://i.ibb.co/7vD49c5/slide-image-3.png"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BannerSlider;
