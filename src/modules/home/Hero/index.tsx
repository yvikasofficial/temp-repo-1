/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useState } from "react";

import Image from "next/image";
import illustration from "@/images/illustration.svg";
import illustration_1 from "@/images/lerochka_Montazhnaya_oblast_1.svg";
import Close from "@/images/close.svg";
import Cookie from "@/images/Cookie.png";

import SearchSrc from "@/images/search.svg";
import CourseCard from "@/components/CourseCard";

import { HomeHeroProps } from "@/pages";
import { CategoryType, ProductType } from "@/interfaces";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/router";

interface HeroProps {
  data: HomeHeroProps;
  categories?: CategoryType[];
}

interface HeroCoursesStateProps {
  loading: boolean;
  courses: ProductType[];
  search: string | null;
}

const Hero: FC<HeroProps> = ({ data, categories = [] }) => {
  const [state, setState] = useState<HeroCoursesStateProps>({
    loading: false,
    courses: [],
    search: null,
  });
  const { courses, loading, search } = state;
  const router = useRouter();

  useEffect(() => {
    const ourRequest = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const res = await axios.get<ProductType[]>("/api/courses", {
          cancelToken: ourRequest.token,
          params: {
            search: search ? search : undefined,
          },
        });
        setState((prevState) => ({
          ...prevState,
          loading: false,
          courses: res?.data
            ?.filter(
              (course) =>
                !course?.categories?.find(
                  (category) => category?.slug === "voucher"
                )
            )
            ?.slice(0, 4),
        }));
      } catch (error) {
        // setState((prevState) => ({ ...prevState, loading: false }));
      }
    };

    fetchData();

    return () => {
      ourRequest.cancel();
    };
  }, [search]);

  return (
    <div className="base-wrapper md:mt-[32px] mt-[8px] mb-[80px] md:mb-[160px]">
      <div className="flex flex-col relative">
        <Image
          alt=""
          src={illustration}
          className="absolute right-0 bottom-[60px] -z-[10] w-[657px] h-[483px] hidden md:block"
        />
        <div className="title-1 md:w-[80%]">{data?.title}</div>
        <div className="flex md:mt-[32px] flex-col">
          <div className="heading-2 md:block hidden max-w-[450px]">
            {data?.description}
          </div>
          <Image src={illustration_1} alt="" className="md:hidden mt-[0px]" />
          <div className="flex flex-wrap gap-[16px] md:w-[40%] mt-[24px] md:mt-[32px]">
            {[...categories]?.slice(0, 5)?.map((category, i) => {
              return (
                <div
                  onClick={() =>
                    router.push(`/courses?category=${category?.id}`)
                  }
                  key={i}
                  className="btn-secondary body-1"
                  dangerouslySetInnerHTML={{ __html: category?.name }}
                />
              );
            })}
            <div
              className="btn-primary body-1"
              onClick={() => router.push("/courses")}
            >
              See all
            </div>
          </div>
        </div>
        <div className="flex bg-[#F3F3F3] py-[19px] rounded-[10px] md:w-[50%] mt-[32px] md:mt-[52px] pr-[24px]">
          <img src={SearchSrc.src} alt="" className="w-[24px] mx-[20px]" />
          <input
            value={search ?? ""}
            onChange={(e) =>
              setState((prevState) => ({
                ...prevState,
                search: e.target.value,
              }))
            }
            type="text"
            placeholder="Search for a course"
            className="bg-[#F3F3F3] border-none outline-none w-full body-1"
          />
        </div>
      </div>
      {search && (
        <div
          className={`px-[20px] py-[5px] rounded-3xl w-max border-[1px] flex items-center gap-[12px] mt-[24px]`}
        >
          <div>
            {" "}
            Showing results for{" "}
            <span className="font-semibold">"{search}"</span>
          </div>
          <img
            onClick={() => {
              setState((prevState) => ({ ...prevState, search: null }));
            }}
            className="w-[15px] cursor-pointer"
            src={Close?.src}
            alt=""
          />
        </div>
      )}
      <div
        className={`${
          courses?.length === 0 && !loading ? "" : "grid"
        } grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-[16px] md:gap-[20px] 2xl:gap-[16px] 3xl:gap-[48px] md:mt-[60px] mt-[40px]`}
      >
        {loading ? (
          <>
            {Array(2)
              .fill(0)
              ?.map((_, index) => {
                return (
                  <div className="w-full" key={index}>
                    <Skeleton
                      style={{
                        height: 180,
                      }}
                      count={1}
                    />
                    <Skeleton className="h-[20px] w-full" count={1} />
                    <Skeleton
                      style={{ width: "60%" }}
                      className="h-[20px]"
                      count={1}
                    />
                  </div>
                );
              })}
          </>
        ) : courses?.length === 0 ? (
          <>
            <div className="min-h-[280px] flex flex-col items-center justify-center w-full">
              <Image className="w-[180px] h-[180px]" src={Cookie} alt="" />
              <div className="opacity-[0.44] text-[20px]">
                Oops, no result for “{search}"
              </div>
            </div>
          </>
        ) : (
          <>
            {courses?.map((item, i) => {
              return <CourseCard key={i} data={item} />;
            })}
          </>
        )}
      </div>
      <div
        onClick={() => router.push("/courses")}
        className="btn-primary body-1 mt-[40px] md:mt-[52px] mx-auto !w-full text-center 2xl:!w-max"
      >
        Explore all classes
      </div>
    </div>
  );
};

export default Hero;
