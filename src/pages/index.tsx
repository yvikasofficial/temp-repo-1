/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/Layout";

import LogoSwiper from "@/components/LogoSwiper";
import ReviewSwiper from "@/components/ReviewSwiper";
import FrequentlyAsked from "@/components/FrequentlyAsked";
import { FC } from "react";
import {
  CategoryType,
  FooterType,
  ProductTagType,
  ProductType,
} from "@/interfaces";
import Hero from "@/modules/home/Hero";
import getPageData from "@/utils/getPageData";
import api, { apiRoutes } from "@/config/apiConfig";
import axios from "axios";
export interface HomeHeroProps {
  title: string;
  description: string;
}

export interface HomeCourseProps {
  title: string;
}

export interface HomeReviewsProps {
  position: string;
  review: string;
  user: string;
}

export interface HomeFAQsProps {
  question: string;
  answer: string;
}

interface HomeProps {
  data: {
    acf: {
      hero: HomeHeroProps;
      courses: ProductType[];
      reviews: HomeReviewsProps[];
      faqs: HomeFAQsProps[];
    };
  };
  tags: ProductTagType[];
  footer: FooterType[];
  categories?: CategoryType[];
}

const Home: FC<HomeProps> = (props) => {
  const { data, footer, categories } = props;

  console.log(data);

  return (
    <Layout {...props}>
      <Hero
        courseData={props?.data?.["_embedded"]?.["acf:post"]}
        categories={categories}
        data={data?.acf?.hero}
      />
      <div className="base-wrapper">
        <div className="heading-2 text-center mb-[24px] md:mb-[36px] md:block hidden">
          Join these top organizations <br /> who’ve used alliance to up-skill
          their workforce
        </div>
        <div className="sub-heading-2 text-center mb-[24px] md:mb-[36px] md:hidden">
          Join these top organizations <br className="md:block hidden" /> who’ve
          used alliance to up-skill their workforce
        </div>
      </div>
      <div className=" mb-[80px] md:mb-[160px]">
        <LogoSwiper data={footer[0]} />
      </div>
      <div className="mb-[80px] md:mb-[160px]">
        <div className="title-2 base-wrapper pb-[36px]">
          Here’s what our <br /> students are saying
        </div>

        <div className="base-wrapper">
          <ReviewSwiper data={data?.acf?.reviews} />
        </div>
      </div>
      <div className="base-wrapper mb-[80px] md:mb-[160px]">
        <FrequentlyAsked data={data?.acf?.faqs} footer={footer?.[0]} />
      </div>
    </Layout>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const props = await getPageData(
    axios.get(`${apiRoutes.HOME_PAGE}`),
    api.get("products/tags", {
      per_page: 8,
    })
  );

  return {
    props: {
      ...props,
      data: props?.res?.[0],
      tags: props?.res2,
    },
  };
};
