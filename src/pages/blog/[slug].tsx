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
              className="single-blog-content mt-[48px] md:w-[70%]"
              dangerouslySetInnerHTML={{
                __html: data?.content?.rendered,
              }}
            />
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
