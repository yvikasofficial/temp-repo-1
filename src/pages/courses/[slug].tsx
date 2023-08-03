/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useState } from "react";
import leftBlue from "../../images/left-blue.svg";
import leftBlack from "../../images/left-black.svg";
import clockGrey from "../../images/clock-grey.svg";
import plus from "../../images/plus.png";
import minus from "../../images/minus.png";
import teacher from "../../images/teacher.svg";
import online from "../../images/online.svg";
import calendar from "../../images/calendar.svg";
import clock from "../../images/clock.svg";
import Image from "next/image";
import Layout from "@/components/Layout";
import { Disclosure, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import getPageData from "@/utils/getPageData";
import axios from "axios";
import { apiRoutes } from "@/config/apiConfig";
import { ProductType } from "@/interfaces";
import moment from "moment";
import AddToCartModal from "@/components/AddToCartModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "@/store/cart-reducer";
import Skeleton from "react-loading-skeleton";

interface CourseDetailsProps {
  data: ProductType;
}

const CourseDetails: FC<CourseDetailsProps> = (props) => {
  const [hovered, setHover] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [state, setState] = useState({
    loading: false,
    data: [] as any[],
    activeMonth: moment(),
  });
  const { activeMonth, data: upcomingData } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const res = await axios.get<ProductType[]>(`${apiRoutes.CALENDER}`, {
          params: {
            year: activeMonth.format("YYYY"),
          },
        });
        console.log(res);

        setState((prevState) => ({
          ...prevState,
          loading: false,
          data: res?.data?.filter(
            (item) => moment(item?.start_date) <= moment()
          ),
        }));
      } catch (error) {}
    };

    fetchData();
  }, []);

  const { data } = props;

  const sortedDates = [...data?.course_start_dates]?.sort(function (a, b) {
    // @ts-ignore
    return new Date(a.date) - new Date(b.date);
  });
  const mostRecentDate = sortedDates?.find(
    (data) => moment(data?.date) > moment()
  );
  const [hydrated, setHydrated] = useState(false);
  const cart = useSelector((globalState: any) => globalState?.cart);
  const isAddedToCart = cart?.items?.find(
    (item: any) => item?.product?.id === data?.id
  );

  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }

  return (
    <Layout {...props}>
      <AddToCartModal
        data={data}
        open={openCart}
        onClose={() => setOpenCart(false)}
      />
      <div className="md:mt-[60px] mt-[32px] base-wrapper mb-[80px] md:mb-[160px] ">
        <div
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
          onClick={() => {
            router.push("/courses");
          }}
          className="hidden px-[32px] w-max py-[16px] body-1 hover:text-[#007BE9] md:flex gap-[16px] items-center transition-all cursor-pointer"
        >
          <Image
            src={hovered ? leftBlue : leftBlack}
            alt=""
            className="ml-[16px]"
          />
          <p>Go to Catalog</p>
        </div>
        <div className="md:mt-[60px]">
          <div className="bg-[#F5F5F5] rounded-[10px] md:px-[48px] 3xl:px-[80px] md:py-[32px] 3xl:py-[60px] flex justify-between gap-[126px] mb-[60px] px-[20px] py-[16px]">
            <div className="flex flex-col gap-[36px] flex-1">
              <Image
                alt=""
                src={data?.image}
                width={94}
                height={94}
                className="bg-slate-200"
              />
              <div className="title-2 !md:heading-1">{data?.name}</div>
              <div className="body-1">{data?.description}</div>
              <div className="flex md:hidden gap-[16px] items-center justify-between">
                <div
                  onClick={
                    isAddedToCart
                      ? () => dispatch(toggleCart())
                      : () => setOpenCart(true)
                  }
                  className={`btn-primary body ${
                    mostRecentDate ? "" : "opacity-50 pointer-events-none"
                  }`}
                >
                  {mostRecentDate
                    ? isAddedToCart
                      ? "View Cart"
                      : "Join upcoming class"
                    : "No upcoming events"}
                </div>
                <div className="title-2">$395</div>
              </div>
            </div>
            <div className="hidden md:flex flex-col text-white bg-[#007BE9] rounded-[10px] md:px-[48px] md:py-[40px] flex-1 justify-evenly">
              <div className="heading-1">Join our upcoming class</div>
              {mostRecentDate ? (
                <div className="cart md:mt-[36px]">
                  {moment(mostRecentDate?.date).format("MMM D, Y")}
                </div>
              ) : (
                <div className="text-[18px]">No upcoming events</div>
              )}
              <div className="flex justify-between md:mt-[52px]">
                <div
                  onClick={
                    isAddedToCart
                      ? () => dispatch(toggleCart())
                      : () => setOpenCart(true)
                  }
                  className={`btn-secondary !border-[#007BE9] body-1 hover:bg-white hover:text-[#007BE9]  ${
                    mostRecentDate ? "" : "opacity-50 pointer-events-none"
                  }`}
                >
                  {isAddedToCart ? "View Cart" : "Join class"}
                </div>
                <div className="heading-2">$395</div>
              </div>
            </div>
          </div>
          <div className="md:mt-[60px] flex items-start flex-col-reverse md:gap-[48px]">
            <div className="w-[100%]">
              <div className="flex items-center justify-between md:mt-0 mt-[40px]">
                <div className="heading-2">Upcoming classes</div>
                <div className="body-1 text 2xl:block hidden">
                  View full schedule
                </div>
                <Image src={calendar} alt="" className="block 2xl:hidden" />
              </div>
              <div className="grid items-center justify-between 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-[24px] gap-[16px] md:mt-[36px] 2xl:gap-[16px] 3xl:gap-[48px] md:gap-[24px]">
                {state?.loading ? (
                  <>
                    <div className="w-[100%]">
                      <Skeleton height={100} />
                    </div>
                    <div className="w-[100%]">
                      <Skeleton height={100} />
                    </div>
                  </>
                ) : (
                  <>
                    {upcomingData?.slice(0, 3).map((course: ProductType, i) => {
                      return (
                        <div
                          onClick={() =>
                            router.push(`/courses/${course?.slug}`)
                          }
                          key={i}
                          className="p-[24px] bg-[#F5F5F5] flex items-center gap-[36px] h-full rounded-[10px] w-[100%] cursor-pointer"
                        >
                          <div className="flex-col flex gap-[4px] justify-between text-center">
                            <div className="date">
                              {moment(course?.start_date).format("d")}
                            </div>
                            <div className="label text-[#9E9E9E]">
                              {" "}
                              {moment(course?.start_date).format("MMM")}
                            </div>
                          </div>
                          <div className="flex flex-col gap-[16px] sub-heading-1 justify-between">
                            <div className="flex items-center gap-[12px]">
                              <Image
                                src={clockGrey}
                                alt=""
                                className="w-[24px] h-[24px]"
                              />
                              <div className="label">
                                Thursday, 9:00 AM - 2:00 PM{" "}
                              </div>
                            </div>
                            {course?.name}
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
              <div className="md:mt-[60px] mt-[40px]">
                <div className="heading-2">Course outline</div>
                <div className="w-full md:mt-[36px] flex flex-col mt-[24px]">
                  {data?.course_outline.map((item, i) => {
                    return (
                      <Disclosure key={i}>
                        {({ open }) => (
                          <div className="pb-[16px] first:pt-0 last:border-none">
                            <Disclosure.Button
                              className={`text-start flex items-center justify-between w-full sub-heading-2 bg-[#F5F5F5] px-[20px] py-[12px] md:px-[32px] md:py-[24px] rounded-[10px] ${
                                open ? "" : ""
                              }`}
                            >
                              <span>{item?.lesson_name}</span>
                              <img
                                src={open ? minus.src : plus.src}
                                alt=""
                                className={`${
                                  open ? "rotate-180 transform" : ""
                                } w-[18px] md:w-[22px]`}
                              />
                            </Disclosure.Button>
                            <Transition
                              enter="transition duration-100 ease-out"
                              enterFrom="transform scale-95 opacity-0"
                              enterTo="transform scale-100 opacity-100"
                              leave="transition duration-75 ease-out"
                              leaveFrom="transform scale-100 opacity-100"
                              leaveTo="transform scale-95 opacity-0"
                            >
                              <Disclosure.Panel
                                className={`${"pb-[24px] body-1 !leading-[32px] mt-[16px]"}`}
                              >
                                <ul className="md:px-[52px] px-[40px] md:py-[16px]">
                                  {item.sub_topics.map((e, i) => {
                                    return (
                                      <li
                                        key={i}
                                        className="body-1 py-[16px] px-[32px] list-disc"
                                      >
                                        {e.sub_topic_name}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </Disclosure.Panel>
                            </Transition>
                          </div>
                        )}
                      </Disclosure>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-[100%] flex items-start 2xl:flex-row flex-col-reverse 2xl:gap-[85px]">
              <div className="flex flex-col gap-[16px] 2xl:w-[50%] 2xl:mt-[0] mt-[24px]">
                <div className="sub-heading-1">At course completion</div>
                <div className="flex gap-[16px]">
                  <div className="body-1">
                    You should have knowledge on using SmartArt, transitions,
                    animations, tables, and linked charts
                  </div>
                </div>
              </div>
              <div className="flex md:gap-[48px] gap-[24px] 2xl:w-[50%] w-full flex-col md:flex-row">
                <div className="flex flex-col gap-[16px] w-[50%]">
                  <div className="sub-heading-1">Duration</div>
                  <div className="flex gap-[16px]">
                    <Image src={clock} alt="" className="w-[32px] h-[32px]" />
                    <div className="body-1">{data?.duration}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-[16px] w-[50%]">
                  <div className="sub-heading-1">Learning method</div>
                  <div className="flex flex-col gap-[16px]">
                    {data?.in_person && (
                      <div className="flex gap-[16px] flex-1">
                        <Image
                          src={teacher}
                          alt=""
                          className="w-[32px] h-[32px]"
                        />
                        <div className="body-1">In-person</div>
                      </div>
                    )}
                    {data?.remote_class && (
                      <div className="flex gap-[16px] flex-1">
                        <Image
                          src={online}
                          alt=""
                          className="w-[32px] h-[32px]"
                        />
                        <div className="body-1">Online</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetails;

export const getServerSideProps = async (props: any) => {
  const myData = await getPageData(
    axios.get(`${apiRoutes.SINGLE_COURSE}`, {
      params: {
        slug: props?.params?.slug,
      },
    })
  );

  return {
    props: {
      ...myData,
      data: myData?.res?.[0],
    },
  };
};
