import { FC, useState } from "react";
import SimpleBar from "simplebar-react";
import ScheduleCard from "../ScheduleCard";
import moment from "moment";
import Image from "next/image";
import arrow from "../../images/ArrowRight.svg";

interface DaySelectorProps {
  value?: any;
  onChange?: any;
  dates?: any;
  data?: any;
}

const DaySelector: FC<DaySelectorProps> = ({
  dates,
  value,
  onChange,
  data,
}) => {
  const [activeMonth, setActiveMonth] = useState(
    moment(value?.date).startOf("M")
  );
  const currentMonthDates = dates?.filter((date: any) => {
    return moment(date?.date).isSame(activeMonth, "M");
  });

  return (
    <>
      <div className="flex w-full justify-between items-center gap-[48px]">
        <Image
          className="cursor-pointer md:w-[40px] md:h-[40px] w-[32px] h-[32px]"
          onClick={() => {
            setActiveMonth(moment(activeMonth).subtract(1, "month"));
          }}
          src={arrow}
          alt=""
        />
        <div className="body-1 text-center">
          {moment(activeMonth).format("MMMM")}{" "}
          {moment(activeMonth).format("YYYY")}
        </div>
        <Image
          onClick={() => {
            setActiveMonth(moment(activeMonth).add(1, "month"));
          }}
          src={arrow}
          alt=""
          className="rotate-180 cursor-pointer md:w-[40px] md:h-[40px] w-[32px] h-[32px]"
        />
      </div>
      <SimpleBar
        style={{
          maxHeight: 500,
        }}
        className="date-select-bar"
      >
        <div className="grid 2xl:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-[16px] my-[24px] pr-[10px] md:pr-[30px] ">
          {currentMonthDates?.length > 0 ? (
            <>
              {currentMonthDates?.map((date: any, i: any) => {
                return (
                  <ScheduleCard
                    disabled={moment(date?.date) <= moment()}
                    onClick={onChange}
                    course={data}
                    active={moment(date?.date).isSame(moment(value?.date), "D")}
                    date={date}
                    key={i}
                  />
                );
              })}
            </>
          ) : (
            <>
              <div className="bg-yellow-100 flex items-center justify-center py-[40px] rounded-[8px]">
                <h2 className="text-center  text-[20px]">No Events found</h2>
              </div>
            </>
          )}
        </div>
      </SimpleBar>
    </>
  );
};

export default DaySelector;
