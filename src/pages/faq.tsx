/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/Layout";
import { FC, useState } from "react";
import SearchSrc from "@/images/search.svg";
import getPageData from "@/utils/getPageData";
import axios from "axios";
import { apiRoutes } from "@/config/apiConfig";
import { Disclosure, Transition } from "@headlessui/react";
import Close from "@/images/close.svg";

import dorpDown from "@/images/up.png";

interface FAQPageProps {}

const FAQPage: FC<FAQPageProps> = (props: any) => {
  const { data } = props;
  const [search, setSearch] = useState(null as any);

  return (
    <Layout {...props}>
      <div className="base-wrapper">
        <div className="flex md:flex-row flex-col items-start md:mb-[160px] mb-[80px] md:gap-[160px] md:mt-[60px] mt-[32px]">
          <div className="flex flex-col md:w-[40%]">
            <div className="title-2 md:mb-[60px]">FAQ</div>
            <div className="body-1 md:block hidden">
              Can’t find the answer you’re looking for?
            </div>
            <div className="btn-primary !w-full body-1 text-center mt-[24px] md:block hidden">
              Contact us
            </div>
          </div>
          <div className="flex flex-col  w-full md:my-0 my-[24px] md:w-[60%]">
            <div className="flex bg-[#F3F3F3] mb-[24px] md:mb-[60px] w-full py-[19px] rounded-[10px] pr-[24px]">
              <img src={SearchSrc.src} alt="" className="w-[24px] mx-[20px]" />
              <input
                value={search}
                onChange={(e) => setSearch(e?.target?.value)}
                type="text"
                placeholder="What courses are you looking for?"
                className="bg-[#F3F3F3] border-none outline-none w-full body-1"
              />
            </div>
            {search && (
              <div
                className={`px-[20px] py-[5px] rounded-3xl w-max border-[1px] flex items-center gap-[12px] mt-[24px]`}
              >
                <div>
                  {" "}
                  Showing results for{" "}
                  <span className="font-semibold">"{search}"</span>
                </div>
                <img
                  onClick={() => {
                    setSearch("");
                  }}
                  className="w-[15px] cursor-pointer"
                  src={Close?.src}
                  alt=""
                />
              </div>
            )}

            {[
              ...(search
                ? data?.[0]?.acf?.faqs?.filter((item) => {
                    return (
                      item?.question
                        .toLowerCase()
                        .includes(search?.toLowerCase()) ||
                      item?.answer.toLowerCase().includes(search?.toLowerCase())
                    );
                  })
                : data?.[0]?.acf?.faqs),
            ]?.map((item: any, i: any) => {
              return (
                <Disclosure key={i}>
                  {({ open }) => (
                    <div className="border-b-[1px] border-[#E0E0E0] py-[24px] first:pt-0 last:border-none">
                      <Disclosure.Button
                        className={` flex items-center justify-between w-full sub-heading-2 ${
                          open ? "" : ""
                        }`}
                      >
                        <span className="text-start md:hidden sub-heading-3 !leading-[24px]">
                          {item?.question}
                        </span>
                        <span className="text-start md:block hidden sub-heading-2">
                          {item?.question}
                        </span>
                        <img
                          src={dorpDown.src}
                          alt=""
                          className={`${
                            open ? "transform" : "rotate-180"
                          } w-[18px] md:w-[22px]`}
                        />
                      </Disclosure.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel
                          className={`${"body-1 !leading-[32px] px-[20px] md:px-[32px] py-[12px] md:py-[16px] bg-[#F5F5F5] border-[#E0E0E0] text-[#9E9E9E] rounded-[10px] mt-[16px]"}`}
                        >
                          <p className="body-1 md:block hidden">
                            {item?.answer}
                          </p>
                          <p className="md:hidden text-[16px] leading-[24px]">
                            {item?.answer}
                          </p>
                        </Disclosure.Panel>
                      </Transition>
                    </div>
                  )}
                </Disclosure>
              );
            })}
            <div className="btn-primary !w-full body-1 text-center mt-[24px] md:hidden block">
              Contact us
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQPage;

export const getServerSideProps = async () => {
  const pageData = await getPageData(axios.get(`${apiRoutes.FAQ_PAGE}`));
  const data = pageData?.res;

  return {
    props: {
      ...pageData,
      data,
    },
  };
};
