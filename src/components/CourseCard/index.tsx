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

  const duration = data?.meta_data?.find((meta) => {
    return meta.key === "duration";
  });

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
      <div className="flex items-start justify-between">
        <Image
          src={data?.images?.[0]?.src}
          width={94}
          height={94}
          className="w-[62px] h-[62px] md:w-[94px] md:h-[94px] bg-gray-200 rounded-[8px] overflow-hidden"
          alt=""
        />
        <Image
          src={isHovered ? ArrowBlue : arrow}
          alt=""
          className="w-[55px] h-[55px]"
        />
      </div>

      <div className="h-full flex justify-between flex-col gap-[4px] 2xl:gap-[16px] mt-[40px]">
        {data?.tags?.map((tag) => {
          return (
            <div
              key={tag?.id}
              className="bg-[#E0E0E0] px-[12px] rounded-[10px] py-[4px] w-max small-2"
            >
              {tag?.name}
            </div>
          );
        })}
        <p className="sub-heading-2">{data?.name}</p>
        <div className="flex gap-[4px] !text-[15px] mt-[12px] 2xl:mt-[0px] items-center">
          <p className="font-[590] !text-[15px] leading-[1.1]">
            {duration?.value}
          </p>
          <p className="!text-[15px] leading-[1.1]">Course</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
