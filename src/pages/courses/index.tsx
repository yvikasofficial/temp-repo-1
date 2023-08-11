/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/Layout";
import { FC, useEffect, useState } from "react";
import SearchSrc from "../../images/search.svg";
import CourseCard from "@/components/CourseCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { CategoryType, ProductTagType, ProductType } from "@/interfaces";
import axios from "axios";
import getPageData from "@/utils/getPageData";
import api, { apiRoutes } from "@/config/apiConfig";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import Cookie from "@/images/Cookie.png";
import Close from "@/images/close.svg";

interface CoursesProps {
  categories: CategoryType[];
  tags: ProductTagType[];
}

interface AllCoursesStateProps {
  loading: boolean;
  courses: ProductType[];
  selectedCategory: CategoryType | null;
  selectedTag: ProductTagType | null;
  search: string | null;
}

const Courses: FC<CoursesProps> = (props) => {
  const { categories, tags } = props;

  const [state, setState] = useState<AllCoursesStateProps>({
    loading: false,
    courses: [],
    selectedCategory: null,
    selectedTag: null,
    search: null,
  });
  const { selectedCategory, selectedTag, courses, loading, search } = state;

  useEffect(() => {
    const ourRequest = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const res = await axios.get<ProductType[]>("/api/courses", {
          cancelToken: ourRequest.token,
          params: {
            category: selectedCategory?.id,
            tag: selectedTag?.id,
            search: search ? search : undefined,
          },
        });
        setState((prevState) => ({
          ...prevState,
          loading: false,
          courses: res?.data,
        }));
      } catch (error) {
        // setState((prevState) => ({ ...prevState, loading: false }));
      }
    };

    fetchData();

    return () => {
      ourRequest.cancel();
    };
  }, [selectedCategory, selectedTag, search]);

  return (
    <Layout {...props}>
      <div className="md:mt-[61px] mt-[12px] md:mb-[160px] mb-[80px]">
        <div className="base-wrapper !flex-row">
          <div className="hidden md:flex flex-col w-[20%] gap-[16px] pr-[48px]">
            <div
              className={`${
                !selectedCategory ? "menu-cat-active" : "menu-cat"
              } `}
              onClick={() =>
                setState((prevState) => ({
                  ...prevState,
                  selectedCategory: null,
                }))
              }
            >
              All Courses
            </div>
            {categories?.map((category) => {
              return (
                <div
                  className={`${
                    selectedCategory?.id === category?.id
                      ? "menu-cat-active"
                      : "menu-cat"
                  } `}
                  onClick={() =>
                    setState((prevState) => ({
                      ...prevState,
                      selectedCategory: category,
                    }))
                  }
                  key={category?.id}
                >
                  <p dangerouslySetInnerHTML={{ __html: category?.name }} />
                </div>
              );
            })}
          </div>
          <div className="flex md:ml-[48px] flex-col w-full md:w-[80%]">
            <div className="flex justify-between w-full md:flex-row flex-col-reverse">
              <div className="flex gap-[16px] md:mt-0 mt-[25px]">
                {tags?.map((tag, i) => {
                  return (
                    <div
                      onClick={() =>
                        setState((prevState) => ({
                          ...prevState,
                          selectedTag: tag?.id === selectedTag?.id ? null : tag,
                        }))
                      }
                      key={i}
                      className={`btn-secondary body-1 md:!w-max text-center !w-[50%]  ${
                        selectedTag?.id === tag?.id
                          ? "!bg-[#007BE9] !text-white !border-[#007BE9]"
                          : "hover:!bg-inherit hover:!text-inherit"
                      }`}
                    >
                      {tag?.name}
                    </div>
                  );
                })}
              </div>
              <div className="flex bg-[#F3F3F3] py-[19px] rounded-[10px] md:w-[50%] pr-[24px] h-max">
                <img
                  src={SearchSrc.src}
                  alt=""
                  className="w-[24px] h-[24px] mx-[20px]"
                />
                <input
                  value={search ?? ""}
                  onChange={(e) =>
                    setState((prevState) => ({
                      ...prevState,
                      search: e.target.value,
                    }))
                  }
                  type="text"
                  placeholder="What courses are you looking for?"
                  className="bg-[#F3F3F3] border-none outline-none w-full body-1 h-max"
                />
              </div>

              <div className="w-full md:hidden mb-[40px]">
                <Swiper spaceBetween={12} slidesPerView={"auto"}>
                  <SwiperSlide
                    style={{
                      width: "max-content",
                    }}
                    className="w-auto swiper-slide"
                    onClick={() =>
                      setState((prevState) => ({
                        ...prevState,
                        selectedCategory: null,
                      }))
                    }
                  >
                    <div
                      className={`btn-secondary body-1  ${
                        !selectedCategory
                          ? "!bg-[#007BE9] !text-white !border-[#007BE9]"
                          : "hover:!bg-inherit hover:!text-inherit"
                      }`}
                    >
                      All Courses
                    </div>
                  </SwiperSlide>
                  {categories?.map((category) => {
                    return (
                      <SwiperSlide
                        style={{
                          width: "max-content",
                        }}
                        key={category?.id}
                        className="w-auto swiper-slide"
                        onClick={() =>
                          setState((prevState) => ({
                            ...prevState,
                            selectedCategory: category,
                          }))
                        }
                      >
                        <div
                          className={`btn-secondary body-1  ${
                            selectedCategory?.id === category?.id
                              ? "!bg-[#007BE9] !text-white !border-[#007BE9]"
                              : "hover:!bg-inherit hover:!text-inherit"
                          }`}
                          key={category.id}
                        >
                          <p
                            dangerouslySetInnerHTML={{ __html: category?.name }}
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
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
              } grid-cols-1 md:grid-cols-2 md:gap-[48px] gap-[16px] md:mt-[30px] mt-[14px]`}
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
                    <Image
                      className="w-[180px] h-[180px]"
                      src={Cookie}
                      alt=""
                    />
                    <div className="opacity-[0.44] text-[20px]">
                      {search
                        ? ` Oops, no result for “${search}"`
                        : "Oops, no result found"}
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Courses;

export const getServerSideProps = async () => {
  const res = await getPageData(
    axios.get(apiRoutes.COURSES_PAGE),
    await api.get("products/tags")
  );
  const popularRes = await api.get("products", {
    include: res?.res?.[0]?.acf?.courses?.join(","),
    "filter[meta]": true,
  });

  return {
    props: {
      ...res,
      data: res?.res?.[0],
      popularCourses: popularRes?.data,
      tags: res?.res2,
    },
  };
};
