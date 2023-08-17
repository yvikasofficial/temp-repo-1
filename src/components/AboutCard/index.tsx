import { useRouter } from "next/router";
import { FC } from "react";

interface AboutCardProps {
  data?: any;
}

const AboutCard: FC<AboutCardProps> = ({ data }) => {
  const router = useRouter();

  return (
    <div className="md:p-[32px] p-[24px] flex flex-col border-[1px] justify-between border-[#E0E0E0] rounded-[10px]">
      <div className="flex flex-col w-full">
        <div className="heading-2 mb-[8px]">{data?.title}</div>
        <div className="body-1">{data?.description}</div>
      </div>
      <div
        onClick={() => router.push(data?.action_button?.url)}
        className="btn-secondary md:mt-[52px] text-center !w-full body-1 mt-[40px]"
      >
        {data?.action_button?.label}
      </div>
    </div>
  );
};

export default AboutCard;
