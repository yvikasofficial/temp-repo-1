/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FooterType } from "@/interfaces";

interface LogoSwiperProps {
  data: FooterType;
}

const LogoSwiper: FC<LogoSwiperProps> = ({ data }) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={"auto"}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }}
      speed={1000}
      modules={[Autoplay]}
      loop
    >
      {[...data?.acf?.logos, ...data?.acf?.logos]?.map((logo, i) => {
        return (
          <SwiperSlide
            key={i}
            style={{
              height: "50px",
              width: "max-content",
            }}
          >
            <img src={logo?.logo?.url} alt="" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default LogoSwiper;
