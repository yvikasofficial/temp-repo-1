/* eslint-disable react/jsx-key */
import { FC, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import ellipseLeft from "../../images/ellipse-left.png";
import Image from "next/image";
interface ReviewSwiperProps {
  data: any;
}

const ReviewSwiper: FC<ReviewSwiperProps> = ({ data }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  return (
    <div className="flex items-center justify-center">
      <Swiper
        onInit={(swiper) => {
          //@ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;

          //@ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        autoplay
        draggable={false}
        onSlideChange={(e) => {
          setCurrentSlide(e.activeIndex);
        }}
        loop
        spaceBetween={48}
        breakpoints={{
          576: {
            slidesPerView: 1,
          },
          1440: {
            slidesPerView: 3,
            spaceBetween: 48,
          },
        }}
        className="flex items-center justify-center"
      >
        <div className="flex items-center justify-center">
          {[...data, ...data].map((review: any, i: any) => (
            <SwiperSlide key={i}>
              {({ isActive }) => (
                <div className="min-h-[400px] md:min-h-[70vh] flex items-center">
                  <div
                    className={`bg-[#F5F5F5] transition-all rounded-[10px]  ${
                      isActive ? "py-[40px] px-[48px]" : "p-[32px]"
                    }`}
                  >
                    <div
                      className={`md:block hidden transition-all ${
                        isActive ? "name-1 mb-[12px]" : "name-2 mb-[8px]"
                      }`}
                    >
                      {review?.name}
                    </div>
                    <div className={`md:hidden name`}>{review?.name}</div>
                    <div
                      className={`text-[#9e9e9e] transition-all mt-[4px] md:mt-0 ${
                        isActive
                          ? "body-1 mb-[12px] md:mb-[24px] "
                          : "label mb-[16px]"
                      }`}
                    >
                      {review?.role}
                    </div>
                    <div
                      className={`md:block hidden transition-all ${
                        isActive
                          ? "body-2 !leading-[42px]"
                          : "body-1 !leading-[32px] h-[200px] overflow-hidden text-ellipsis"
                      }`}
                    >
                      {review?.review}
                    </div>
                    <div className={`md:hidden body`}>{review?.review}</div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </div>
        <div className="flex items-center justify-center gap-[48px]">
          <div ref={prevRef} className="2xl:block hidden">
            <Image alt="" src={ellipseLeft} />
          </div>
          <div className="flex">
            {currentSlide} / {data?.length}
          </div>
          <div ref={nextRef}>
            <Image
              alt=""
              src={ellipseLeft}
              className="rotate-180 2xl:block hidden"
            />
          </div>
        </div>
      </Swiper>
    </div>
  );
};

export default ReviewSwiper;
