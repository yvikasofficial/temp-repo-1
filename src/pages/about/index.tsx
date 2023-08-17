import Layout from "@/components/Layout";
import { FC } from "react";
import img from "../../images/ribboncutting.png";
import Image from "next/image";
import LogoSwiper from "@/components/LogoSwiper";
import AboutCard from "@/components/AboutCard";
import getPageData from "@/utils/getPageData";
import { apiRoutes } from "@/config/apiConfig";
import axios from "axios";
import { useRouter } from "next/router";

interface AboutProps {}

const About: FC<AboutProps> = (props: any) => {
  const { data, categories } = props;
  const pageData = data?.acf;

  const router = useRouter();

  return (
    <Layout {...props}>
      <div className="base-wrapper">
        <div className="hidden md:flex gap-[48px] mt-[60px] mb-[60px]">
          <div className="flex-col flex flex-1 md:w-[50%]">
            <div className="title-1">{pageData?.hero?.title}</div>
            <div className="flex gap-[48px]">
              <div
                className="body-1 mt-[60px] flex-1 md:w-[50%]"
                dangerouslySetInnerHTML={{
                  __html: pageData?.hero?.description,
                }}
              />

              <Image
                width={676}
                height={304}
                src={pageData?.hero?.image?.url}
                alt=""
                className="mt-[60px] flex-1 rounded-[10px] object-cover bg-slate-200  md:w-[50%]"
              />
            </div>
          </div>
        </div>
        <div className="lg:hidden flex flex-col mt-[36px] mb-[40px]">
          <div className="title-2"> {pageData?.services?.title}</div>
          <Image
            width={676}
            height={304}
            src={img}
            alt=""
            className="rounded-[10px] w-full mt-[24px] object-cover bg-slate-200"
          />

          <div
            className="text-[16px] leading-[140%] mt-[16px]"
            dangerouslySetInnerHTML={{
              __html: pageData?.hero?.description,
            }}
          />
        </div>
      </div>
      <LogoSwiper data={props?.footer?.[0]} />
      <div className="mt-[80px] md:mt-[160px] base-wrapper">
        <div className="flex flex-col bg-[#F5F5F5] rounded-[10px] 2xl:px-[48px] 2xl:py-[32px] md:p-[24px] px-[20px] py-[16px]">
          <div className="title-2 w-[100%] 2xl:w-[100%]">
            {pageData?.services?.title}
          </div>
          <div className="md:hidden body mt-[16px]">
            {pageData?.services?.description}
          </div>
          <div className="md:block hidden body-1 w-[100%] mt-[60px]">
            {pageData?.services?.description}
          </div>
          <div className="md:hidden body mt-[12px]">
            {pageData?.services?.sub}
          </div>
          <div className="flex flex-wrap gap-[12px] mt-[36px] md:mt-[24px] w-[90%]">
            {categories?.map((category: any, i: any) => {
              return (
                <div
                  onClick={() => {
                    router.push(`/courses?category_id=${category?.id}`);
                  }}
                  key={i}
                  className="btn-secondary body-1 hover:!bg-[#007BE9] !bg-transparent"
                  dangerouslySetInnerHTML={{
                    __html: category?.name,
                  }}
                />
              );
            })}
            <div className="btn-primary body-1">All Courses</div>
          </div>
          <div className="md:block hidden body mt-[36px] w-[50%]">
            {pageData?.services?.sub}
          </div>
        </div>
      </div>
      <div className="base-wrapper !grid 2xl:grid-cols-3 grid-cols-1 md:gap-[48px] gap-[16px] md:my-[160px] my-[80px]">
        {pageData?.action_cards?.map((item: any, i: any) => {
          return <AboutCard data={item} key={i} />;
        })}
      </div>
    </Layout>
  );
};

export default About;

export const getServerSideProps = async () => {
  const resData = await getPageData(
    axios.get(`${apiRoutes.ABOUT_PAGE}&_embed`)
  );

  return {
    props: {
      ...resData,
      data: resData?.res?.[0],
    },
  };
};
