import { FC, Fragment, useEffect, useState } from "react";
import arrow from "../../images/chevron-down.svg";
import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";

import { useRouter } from "next/router";
import { CategoryType, ProductType } from "@/interfaces";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

interface CoursePopOverProps {
  categories?: CategoryType[];
}

const CoursePopOver: FC<CoursePopOverProps> = ({ categories }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [state, setState] = useState({
    loading: false,
    data: [] as ProductType[],
    selectedCategory: categories?.[0],
  });
  const { selectedCategory, data, loading } = state;
  const router = useRouter();

  useEffect(() => {
    const ourRequest = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const res = await axios.get<ProductType[]>("/api/courses", {
          cancelToken: ourRequest.token,
          params: {
            category: selectedCategory?.id,
            per_page: 5,
          },
        });
        setState((prevState) => ({
          ...prevState,
          loading: false,
          data: res?.data,
        }));
      } catch (error) {
        //
      }
    };

    fetchData();

    return () => {
      ourRequest.cancel();
    };
  }, [selectedCategory]);

  return (
    <div className="relative">
      <Popover>
        <Popover.Button
          as="div"
          className={`lg:block hidden`}
          onMouseEnter={() => setIsShowing(true)}
          onMouseLeave={() => setIsShowing(false)}
        >
          <div
            onClick={() => router.push("/courses")}
            className={`items-center justify-center cursor-pointer text-[21px] rounded-[10px] border-[1px] border-black flex gap-[16px] 3xl:px-[32px] md:px-[24px] md:py-[10px] 3xl:py-[16px] px-[20px] py-[12px]`}
          >
            <div>Courses</div>
            <Image src={arrow} alt="" className="w-[24px] h-[24px]" />
          </div>
        </Popover.Button>
        <Transition
          show={isShowing}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Popover.Panel
            onMouseEnter={() => setIsShowing(true)}
            onMouseLeave={() => setIsShowing(false)}
            className={`absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 translate-x-[80%] z-[10001] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none outline-none w-[805px] bg-[#F5F5F5] rounded-[10px] `}
          >
            <div className="flex p-[32px]">
              <div className="w-[40%] flex flex-col gap-[16px] border-r-[2px] border-[#E0E0E0] bg-yellow">
                {categories?.map((category) => {
                  return (
                    <div
                      onClick={() =>
                        setState((prevState) => ({
                          ...prevState,
                          selectedCategory: category,
                        }))
                      }
                      className={`body-1 cursor-pointer py-[8px] px-[32px] hover:text-[#000000] ${
                        selectedCategory?.id === category?.id
                          ? "text-black"
                          : "text-[#9E9E9E]"
                      }`}
                      key={category.id}
                      dangerouslySetInnerHTML={{ __html: category?.name }}
                    />
                  );
                })}
              </div>
              <div className="w-[60%] flex flex-col gap-[16px]">
                {loading ? (
                  <>
                    {new Array(3).fill(0).map((_, i) => {
                      return (
                        <div
                          className="flex gap-[10px] w-full mb-[10px] px-[32px]"
                          key={i}
                        >
                          <Skeleton height={50} width={50} />
                          <div className="w-full flex flex-col gap-[2px]">
                            <Skeleton
                              style={{ flex: 1, width: "100%" }}
                              height={10}
                              width="100%"
                            />
                            <Skeleton
                              style={{ flex: 1, width: "50%" }}
                              height={10}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {data.map((course) => {
                      return (
                        <div
                          className="flex cursor-pointer gap-[16px] items-center hover:bg-white px-[32px] py-[16px] rounded-[10px]"
                          key={course.id}
                          onClick={() => {
                            router.push(`/courses/${course?.slug}`);
                          }}
                        >
                          <Image
                            src={course?.images?.[0]?.src}
                            width={92}
                            height={92}
                            alt=""
                            className="w-[32px] h-[32px]"
                          />
                          <div className="body-1">{course?.name}</div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};

export default CoursePopOver;
