import { FC, useState } from "react";
import word from "../../images/word.png";
import arrow from "../../images/arrow-dia.svg";
import ArrowBlue from "../../images/arrow-diagonal.svg";
import Image from "next/image";
import { ProductType } from "@/interfaces";
import { useRouter } from "next/router";

interface CourseCardProps {
  className?: any;
  data: ProductType;
}

const CourseCard: FC<CourseCardProps> = ({ className, data }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={() => router.push(`/courses/${data?.slug}`)}
      className={`${className} cursor-pointer flex flex-col gap-[20px] p-[24px] bg-[#F5F5F5] rounded-[10px]`}
    >
      <div className="flex items-center justify-between">
        <Image
          src={data?.images?.[0]?.src}
          width={94}
          height={94}
          className="w-[62px] h-[62px] md:w-[94px] md:h-[94px] bg-gray-200 rounded-[8px] overflow-hidden"
          alt=""
        />
        <Image src={isHovered ? ArrowBlue : arrow} alt="" />
      </div>

      <div className="h-full flex justify-between flex-col gap-[4px] 2xl:gap-[16px] mt-[40px]">
        <div className="bg-[#E0E0E0] px-[12px] rounded-[10px] py-[4px] w-max small-2">
          Spanish
        </div>
        <p className="sub-heading-2">{data?.name}</p>
        <div className="flex gap-[4px] !text-[15px] mt-[12px] 2xl:mt-[0px]">
          <p className="small-1 !text-[15px]">{data?.duration}</p>
          <p className="small-2 !text-[15px]">Course</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
