import { FC } from "react";
import clock from "@/images/clock.svg";
import clockLight from "@/images/clock-light.svg";
import Image from "next/image";
import moment from "moment";

interface ScheduleCardProps {
  active?: boolean;
  date?: any;
  course?: any;
  onClick?: any;
  disabled?: boolean;
}

const ScheduleCard: FC<ScheduleCardProps> = ({
  active,
  course,
  date,
  onClick,
  disabled,
}) => {
  return (
    <div
      onClick={() => onClick(date)}
      className={`px-[20px] py-[12px] md:p-[24px] cursor-pointer flex rounded-[10px] gap-[24px] items-center ${
        disabled
          ? "bg-[#F5F5F5] text-black opacity-50 pointer-events-none"
          : active
          ? "bg-[#007BE9] text-white"
          : "bg-[#F5F5F5] text-black"
      }`}
    >
      <div className="flex flex-col gap-[4px] items-center">
        <div className="cart">{moment(date?.date).format("D")}</div>
        <div className="label">{moment(date?.date).format("MMM")}</div>
      </div>
      <div className="flex flex-col gap-[12px]">
        <div className="flex items-center gap-[8px]">
          <Image src={active ? clockLight : clock} alt="" />
          <div className="label">
            Sunday, {moment(date.start_time, "hh").format("LT")} -{" "}
            {moment(date.end_time, "hh").format("LT")}
          </div>
        </div>
        <div className="sub-heading-2">{course?.name}</div>
      </div>
    </div>
  );
};

export default ScheduleCard;
