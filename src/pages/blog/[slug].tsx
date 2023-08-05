import Layout from "@/components/Layout";
import { apiRoutes } from "@/config/apiConfig";
import { BlogType } from "@/interfaces";
import getPageData from "@/utils/getPageData";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import { FC } from "react";

interface SingleBlogProps {
  data: BlogType;
}

const SingleBlog: FC<SingleBlogProps> = (props) => {
  const { data } = props;
  const category = data?._embedded?.["wp:term"]?.[0]?.[0];

  return (
    <Layout {...props}>
      <div className="single-blog flex max-w-[1440px] mx-auto w-[90%] gap-[48px] md:pb-[160px] pb-[80px]">
        <div className="h-max mb-[150px] pt-[20px] w-full">
          <div className="w-full">
            <div className="flex 2xl:items-center gap-[12px] 2xl:gap-[40px] 2xl:flex-row flex-col">
              <div
                className="2xl:px-[24px] 2xl:py-[10px] px-[12px] py-[4px] rounded-[10px] bg-[#007BE9] label text-white w-max"
                dangerouslySetInnerHTML={{
                  __html: category?.name,
                }}
              />
              <div className="label">
                {moment(data?.modified).format("MMMM DD, YYYY")}
              </div>
            </div>
            <h1 className="heading">{data?.title?.rendered}</h1>
            <div className="md:w-full h-[250px] md:h-[300px] 2xl:h-[500px] mt-[30px]">
              <Image
                src={data?._embedded?.["wp:featuredmedia"][0]?.source_url}
                width={850}
                height={406}
                className="w-full h-full object-cover bg-slate-200"
                alt=""
              />
            </div>
          </div>
          <div className="flex">
            <div
              className="single-blog-content mt-[48px]"
              dangerouslySetInnerHTML={{
                __html: data?.content?.rendered,
              }}
            />

            {/* <div className="hidden md:flex flex-col w-[40%]">
              <div className="flex-1 flex items-center">
                <div className="flex flex-col p-[32px] bg-[#F5F5F5] rounded-[10px]">
                  <div className="sub-heading-2 mb-[32px]">
                    Explore classes from this article
                  </div>
                  <div className="flex flex-col gap-[16px]">
                    <div className="px-[32px] py-[16px] body-1 bg-white rounded-[10px]">
                      Business writing
                    </div>
                    <div className="px-[32px] py-[16px] body-1 bg-white rounded-[10px]">
                      Leadership & management
                    </div>
                    <div className="px-[32px] py-[16px] body-1 bg-white rounded-[10px]">
                      Sexual harassment, discrimination and bullying
                    </div>
                    <div className="px-[32px] py-[16px] body-1 bg-white rounded-[10px]">
                      Excel
                    </div>
                    <div className="btn-primary !w-full mt-[36px] body-1 text-center">
                      View all classes
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-[32px] bg-[#F5F5F5] rounded-[10px]">
                <div className="sub-heading-2 mb-[32px]">
                  Explore classes from this article
                </div>
                <div className="flex flex-col gap-[16px]">
                  <div className="px-[32px] py-[16px] body-1 bg-white rounded-[10px]">
                    Business writing
                  </div>
                  <div className="px-[32px] py-[16px] body-1 bg-white rounded-[10px]">
                    Leadership & management
                  </div>
                  <div className="px-[32px] py-[16px] body-1 bg-white rounded-[10px]">
                    Sexual harassment, discrimination and bullying
                  </div>
                  <div className="px-[32px] py-[16px] body-1 bg-white rounded-[10px]">
                    Excel
                  </div>
                  <div className="btn-primary !w-full mt-[36px] body-1 text-center">
                    View all bundles
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleBlog;

export const getServerSideProps = async (props: any) => {
  const myData = await getPageData(
    axios.get(`${apiRoutes.BLOGS}&slug=${props?.params?.slug}`)
  );

  if (!myData?.res?.[0]) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...myData,
      data: myData?.res?.[0],
    },
  };
};
