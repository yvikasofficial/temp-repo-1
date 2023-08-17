import Layout from "@/components/Layout";
import { NextPage } from "next";
import ImgSrc from "../images/illustration.svg";
import Image from "next/image";
import getPageData from "@/utils/getPageData";
import axios from "axios";
import { apiRoutes } from "@/config/apiConfig";

interface ClassRoomProps {}

const ClassRoom: NextPage<ClassRoomProps> = (props: any) => {
  const pageData = props?.data?.[0]?.acf;

  return (
    <Layout {...props}>
      <div className="pb-[80px] md:pb-[160px] base-wrapper">
        <div className="title-1">{pageData?.title}</div>
        <div
          className="2xl:w-[80%] body-1 2xl:mt-[36px] md:mt-[24px] mt-[12px] contact-form"
          dangerouslySetInnerHTML={{
            __html: pageData?.description,
          }}
        />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-[12px] md:gap-[20px] 2xl:mt-[60px] md:mt-[48px] mt-[40px]">
          {pageData?.classrooms?.map((room: any, i: any) => {
            return (
              <div
                key={i}
                className="flex justify-between h-full flex-col 2xl:px-[32px] 2xl:py-[24px] px-[20px] py-[16px] 2xl:gap-[16px] gap-[20px] bg-[#F5F5F5] rounded-[10px]"
              >
                <div>
                  <div className="sub-heading-2">{room?.title}</div>
                  <div className="body-1">{room?.description}</div>
                </div>
                <Image
                  width={468}
                  height={352}
                  className="h-[352px] w-full bg-slate-200 rounded-[10px]"
                  alt=""
                  src={room?.image?.url}
                />
              </div>
            );
          })}
        </div>
        <div
          className="body-1 2xl:mt-[60px] md:mt-[48px] mt-[40px] contact-form"
          dangerouslySetInnerHTML={{
            __html: pageData?.contact_info,
          }}
        />
      </div>
    </Layout>
  );
};

export default ClassRoom;

export const getServerSideProps = async () => {
  const pageData = await getPageData(axios.get(`${apiRoutes.CLASSROOM}`));
  const data = pageData?.res;

  return {
    props: {
      ...pageData,
      data,
    },
  };
};
