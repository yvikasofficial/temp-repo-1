import Layout from "@/components/Layout";
import { NextPage } from "next";
import ImgSrc from "../images/illustration.svg";
import Image from "next/image";
import getPageData from "@/utils/getPageData";

interface ClassRoomProps {}

const ClassRoom: NextPage<ClassRoomProps> = (props: any) => {
  return (
    <Layout {...props}>
      <div className="pb-[80px] md:pb-[160px] base-wrapper">
        <div className="title-1">Classroom rentals</div>
        <div className="2xl:w-[80%] body-1 2xl:mt-[36px] md:mt-[24px] mt-[12px]">
          Alliance Career Training Solution’s computer lab classrooms have a
          professional, high tech feel suitable for training, state testing,
          exam preparations, business meetings, and events.
        </div>
        <div className="2xl:w-[80%] body-1 2xl:mt-[36px] mt-[12px]">
          During normal hours renters can enjoy access to a shared kitchen
          stocked with water, tea, and hot chocolate. Included in the room
          rental are a Continental type breakfast (bagels, pastries, juice,
          etc.), afternoon snacks (cookies, brownies, fruit, etc.), and other
          refreshments like coffee, tea, water, and soda. All of these
          refreshments can be accessed throughout the day.
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-[12px] md:gap-[20px] 2xl:mt-[60px] md:mt-[48px] mt-[40px]">
          <div className="flex flex-col 2xl:px-[32px] 2xl:py-[24px] px-[20px] py-[16px] 2xl:gap-[16px] gap-[20px] bg-[#F5F5F5] rounded-[10px]">
            <div className="sub-heading-2"> Room 101</div>
            <div className="body-1">
              It is our largest room available, featuring 20 computers (four
              rows of five).
            </div>
            <Image className="h-[352px] w-full" alt="" src={ImgSrc} />
          </div>
          <div className="flex flex-col 2xl:px-[32px] 2xl:py-[24px] px-[20px] py-[16px] 2xl:gap-[16px] gap-[20px] bg-[#F5F5F5] rounded-[10px]">
            <div className="sub-heading-2"> Room 101</div>
            <div className="body-1">
              It is our largest room available, featuring 20 computers (four
              rows of five).
            </div>
            <Image className="h-[352px] w-full" alt="" src={ImgSrc} />
          </div>
          <div className="flex flex-col 2xl:px-[32px] 2xl:py-[24px] px-[20px] py-[16px] 2xl:gap-[16px] gap-[20px] bg-[#F5F5F5] rounded-[10px]">
            <div className="sub-heading-2"> Room 101</div>
            <div className="body-1">
              It is our largest room available, featuring 20 computers (four
              rows of five).
            </div>
            <Image className="h-[352px] w-full" alt="" src={ImgSrc} />
          </div>
          <div className="flex flex-col 2xl:px-[32px] 2xl:py-[24px] px-[20px] py-[16px] 2xl:gap-[16px] gap-[20px] bg-[#F5F5F5] rounded-[10px]">
            <div className="sub-heading-2"> Room 101</div>
            <div className="body-1">
              It is our largest room available, featuring 20 computers (four
              rows of five).
            </div>
            <Image className="h-[352px] w-full" alt="" src={ImgSrc} />
          </div>
        </div>
        <div className="body-1 2xl:mt-[60px] md:mt-[48px] mt-[40px]">
          Feel free to call for more information on pricing and what all we can
          offer at <span className="text-[#007BE9]">(831) 755-8200</span>
        </div>
      </div>
    </Layout>
  );
};

export default ClassRoom;

export const getServerSideProps = async (props: any) => {
  const myData = await getPageData(() => null);

  return {
    props: {
      ...myData,
    },
  };
};
