/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "@/components/Layout";
import getPageData from "@/utils/getPageData";
import { FC, useEffect, useRef, useState } from "react";
import uniqolor from "uniqolor";
import tippy from "tippy.js";
import ReactLoading from "react-loading";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import { apiRoutes } from "@/config/apiConfig";
import { ProductType } from "@/interfaces";
import ArrowRight from "@/images/ArrowRight.svg";
import Image from "next/image";
import moment from "moment";
import listPlugin from "@fullcalendar/list";
import SimpleBar from "simplebar-react";
import { BarLoader } from "react-spinners";

interface CalenderPageProps {}

const CalenderPage: FC<CalenderPageProps> = (props) => {
  const ref = useRef<any>();
  const [state, setState] = useState({
    loading: false,
    data: [] as any[],
    activeMonth: moment(),
  });
  const [show, setShow] = useState(false);
  const { data, activeMonth, loading } = state;

  function parseDate(input: string) {
    let parts = input.split("-");

    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  const activeYear = activeMonth.format("YYYY");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        ref?.current?.calendar.changeView("dayGridMonth");
      } else {
        ref?.current?.calendar.changeView("listMonth");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const res = await axios.get<ProductType[]>(`${apiRoutes.CALENDER}`, {
          params: {
            year: activeMonth.format("YYYY"),
          },
        });

        setState((prevState) => ({
          ...prevState,
          loading: false,
          data: res?.data?.map((product) => {
            return {
              title: product?.name,
              url: `/courses/${product?.slug}`,
              backgroundColor: uniqolor(product?.id)?.color,
              start: parseDate(product?.start_date),
              allDay: true,
              id: `${product?.id} - ${product?.start_date}`,
              description: product?.name,
            };
          }),
        }));
      } catch (error) {}
    };

    fetchData();
  }, [activeYear]);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 5000);
  }, []);

  return (
    <Layout {...props}>
      {show ? (
        <>
          <SimpleBar style={{}}>
            <div className="base-wrapper pb-[140px]">
              <div className="mt-[50px] relative">
                {loading && (
                  <div className="w-full h-full bg-black bg-opacity-30 absolute top-0 left-0 z-[2] flex items-center justify-center">
                    <ReactLoading
                      type="spokes"
                      color={"#137160"}
                      height={100}
                      width={100}
                    />
                  </div>
                )}
                <div className="relative flex items-center justify-between mb-[25px] md:mb-[50px]">
                  <div
                    onClick={() => {
                      ref?.current?.calendar?.prev();
                      setState((prevState) => ({
                        ...prevState,
                        activeMonth: moment(activeMonth).subtract(1, "months"),
                      }));
                    }}
                    className="flex gap-[30px] items-center text-black py-[10px] px-[20px] rounded-[44px] border-black cursor-pointer hover:opacity-50 transition-opacity"
                  >
                    <Image
                      src={ArrowRight}
                      alt=""
                      className="w-[24px] h-[24px] md:w-[56px] md:h-[56px]"
                    />
                    <h2 className="hidden md:block text-[32px]">
                      {moment(activeMonth).subtract(1, "months").format("MMM")}
                    </h2>
                  </div>
                  <h2
                    key={`${activeMonth.toString()}`}
                    className="text-[22px] md:text-[64px] font-[300]"
                  >
                    {ref?.current?.calendar?.currentData?.viewTitle}
                  </h2>
                  <div
                    onClick={() => {
                      ref?.current?.calendar?.next();
                      setState((prevState) => ({
                        ...prevState,
                        activeMonth: moment(activeMonth).add(1, "months"),
                      }));
                    }}
                    className="flex gap-[30px] items-center text-black py-[10px] px-[20px] rounded-[44px] cursor-pointer hover:opacity-50 transition-opacity"
                  >
                    <h2 className="hidden md:block text-[32px]">
                      {moment(activeMonth).add(1, "months").format("MMM")}
                    </h2>
                    <Image
                      src={ArrowRight}
                      alt=""
                      className="w-[24px] h-[24px] md:w-[56px] md:h-[56px] rotate-180"
                    />
                  </div>
                </div>
                <FullCalendar
                  height="auto"
                  ref={ref}
                  eventDidMount={(event) => {
                    if (event.event.extendedProps.description) {
                      return tippy(event.el, {
                        content: event.event.extendedProps.description,
                      });
                    }

                    return null;
                  }}
                  headerToolbar={{ left: "", right: "", center: "" }}
                  initialView={"dayGridMonth"}
                  hiddenDays={[]}
                  plugins={[dayGridPlugin, listPlugin]}
                  events={data}
                  // eventContent={renderEventContent}
                />
              </div>
            </div>
          </SimpleBar>
        </>
      ) : (
        <div className="min-h-[80vh]">
          <div className="fixed top-0 flex items-center flex-col justify-center left-0 w-[100%] h-screen bg-black z-50 bg-opacity-30">
            <div className="bg-white p-[50px] md:p-[100px] flex items-center gap-[20px] flex-col justify-center rounded-[10px]">
              <div className="text-[#007be9] text-[22px] text-center">
                Loading the calender
              </div>
              <BarLoader color="#007be9" />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CalenderPage;

export const getServerSideProps = async () => {
  const res = await getPageData();

  return {
    props: {
      ...res,
    },
  };
};
