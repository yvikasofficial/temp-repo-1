/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import BlogCard from "@/components/BlogCard";
import Button from "@/components/Button";
import Layout from "@/components/Layout";
import { apiRoutes } from "@/config/apiConfig";
import getPageData from "@/utils/getPageData";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Swiper, SwiperSlide } from "swiper/react";

interface BlogProps {}

const Blog: FC<BlogProps> = (props: any) => {
  const { data } = props;
  const [selectedCategory, setSelectedCategory] = useState(null as any);
  const [state, setState] = useState({
    loading: false,
    posts: null as any,
    page: 1,
    per_page: 8,
    fetching: false,
    hasMore: true,
  });

  const { page, per_page, loading, posts, fetching, hasMore } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prevState) => ({
          ...prevState,
          page: 1,
          loading: true,
          data: null,
        }));
        const res = await axios.get(`${apiRoutes.BLOGS}`, {
          params: {
            per_page,
            category: selectedCategory?.id,
          },
        });
        setState((prevState) => ({
          ...prevState,
          loading: false,
          posts: res?.data,
          hasMore: res?.data?.length === per_page,
        }));
      } catch (error) {}
    };

    fetchData();
  }, [selectedCategory]);

  useEffect(() => {
    if (page !== 1) {
      const fetchData = async () => {
        try {
          setState((prevState) => ({
            ...prevState,
            page: 1,
            fetching: true,
            data: null,
          }));
          const res = await axios.get(`${apiRoutes.BLOGS}`, {
            params: {
              per_page,
              category: selectedCategory?.id,
              page,
            },
          });
          setState((prevState) => ({
            ...prevState,
            fetching: false,
            posts: [...prevState?.posts, ...res?.data],
            hasMore: res?.data?.length === per_page,
          }));
        } catch (error) {}
      };

      fetchData();
    }
  }, [page]);

  return (
    <Layout {...props}>
      <div className="2xl:mt-[61px] mt-[12px] 2xl:mb-[160px] mb-[80px]">
        {/* <div className="base-wrapper">
          <div className="w-full 2xl:hidden mb-[40px]">
            <Swiper spaceBetween={12} slidesPerView={"auto"}>
              {data.map((category: any) => {
                return (
                  <SwiperSlide
                    style={{
                      width: "max-content",
                    }}
                    key={category.id}
                    className="w-auto swiper-slide"
                  >
                    <div className="btn-secondary" key={category.id}>
                      {category.name}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div> */}
        <div className="base-wrapper mb-[40px] md:mb-[60px] 2xl:hidden">
          <div className="flex flex-wrap gap-[12px] mt-[32px]">
            <div
              onClick={() => setSelectedCategory(null)}
              className={`btn-secondary body-1  ${
                selectedCategory === null
                  ? "!bg-[#007BE9] !text-white !border-[#007BE9]"
                  : "hover:!bg-inherit hover:!text-inherit"
              }`}
            >
              {" "}
              All articles
            </div>

            {data.map((category: any) => {
              return (
                <div
                  className={`btn-secondary body-1  ${
                    selectedCategory?.id === category?.id
                      ? "!bg-[#007BE9] !text-white !border-[#007BE9]"
                      : "hover:!bg-inherit hover:!text-inherit"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                  key={category.id}
                  dangerouslySetInnerHTML={{ __html: category.name }}
                />
              );
            })}
          </div>
        </div>
        <div className="base-wrapper !flex-row">
          <div className="hidden 2xl:flex flex-col w-[20%] gap-[16px] pr-[48px] min-h-[300px]">
            <div
              className={`${
                !selectedCategory ? "menu-cat-active" : "menu-cat"
              } `}
              onClick={() => setSelectedCategory(undefined)}
            >
              All articles
            </div>
            {data.map((category: any) => {
              return (
                <div
                  className={`${
                    selectedCategory?.id === category?.id
                      ? "menu-cat-active"
                      : "menu-cat"
                  } `}
                  onClick={() => setSelectedCategory(category)}
                  key={category?.id}
                  dangerouslySetInnerHTML={{ __html: category?.name }}
                />
              );
            })}
          </div>
          <div className=" 2xl:ml-[48px] w-full 2xl:w-[80%] flex flex-col">
            <div className="grid md:grid-cols-2 grid-cols-1 2xl:gap-[48px] gap-[16px]">
              {loading ? (
                <>
                  {Array(4)
                    .fill(0)
                    .map((item, i) => {
                      return (
                        <div key={i}>
                          <Skeleton key={i} className="w-full h-[200px]" />
                          <Skeleton key={i} className="w-full h-[20px]" />
                          <Skeleton
                            style={{
                              width: "60%",
                            }}
                            key={i}
                            className="w-[30%] h-[20px]"
                          />
                        </div>
                      );
                    })}
                </>
              ) : (
                <>
                  {posts?.map((post: any, i: any) => {
                    return <BlogCard key={i} data={post} />;
                  })}
                </>
              )}
            </div>
            {hasMore && !loading && (
              <Button
                onClick={() =>
                  setState((prevState) => ({
                    ...prevState,
                    page: prevState.page + 1,
                  }))
                }
                disabled={fetching}
              >
                Load more
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;

export const getServerSideProps = async () => {
  const pageData = await getPageData(axios.get(`${apiRoutes.BLOG_CATEGORIES}`));
  const data = pageData?.res;

  return {
    props: {
      ...pageData,
      data,
    },
  };
};
