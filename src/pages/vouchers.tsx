import Layout from "@/components/Layout";
import { apiRoutes } from "@/config/apiConfig";
import { ProductType } from "@/interfaces";
import { getUSDFormat } from "@/utils/cartHelper";
import getPageData from "@/utils/getPageData";
import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

interface TrainingProps {}

const Training: NextPage<TrainingProps> = (props: any) => {
  const pageData = props?.data?.[0]?.acf;

  const [state, setState] = useState({
    loading: false,
    vouchers: [] as ProductType[],
  });
  const { loading, vouchers } = state;
  console.log(vouchers);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const res = await axios.get<ProductType[]>("/api/courses", {
          params: {
            category: 48,
          },
        });
        setState((prevState) => ({
          ...prevState,
          loading: false,
          vouchers: res?.data,
        }));
      } catch (error) {
        // setState((prevState) => ({ ...prevState, loading: false }));
      }
    };

    fetchData();
  }, []);

  return (
    <Layout {...props}>
      <div className="md:my-[80px] my-[160px] base-wrapper">
        <div className="title-1">{pageData?.title}</div>
        <div className="mt-[36px]  body-1 ">{pageData?.description}</div>
        <div className="flex md:flex-row flex-col 2xl:gap-[48px] gap-[8px] md:gap-[20px] 2xl:mt-[60px] mt-[40px] ">
          {loading ? (
            <>
              <div className="flex-1">
                <Skeleton height={80} />
              </div>
              <div className="flex-1">
                <Skeleton height={80} />
              </div>
            </>
          ) : (
            <>
              {vouchers?.map((voucher, i) => {
                return (
                  <div
                    key={i}
                    className="px-[20px] py-[16px] md:px-[24px] 2xl:py-[24px] 2xl:px-[32px] bg-[#F5F5F5] gap-[16px] justify-between flex-1 flex items-center rounded-[10px]"
                  >
                    <div className="cart">{voucher?.name}</div>
                    <div className="flex items-center gap-[12px]">
                      <div className="name-1">
                        {getUSDFormat(voucher?.price)}
                      </div>
                      <div className="font-[20px] text-[#9E9E9E] line-through">
                        {getUSDFormat(voucher?.regular_price)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
        {pageData?.info?.map((el: any, i: any) => {
          return (
            <div key={i}>
              <div className="heading-2 2xl:mt-[60px] mt-[40px]">
                {el?.title}
              </div>
              <div
                className=" body-1 md:mt-[32px] mt-[16px] contact-form"
                dangerouslySetInnerHTML={{
                  __html: el?.description,
                }}
              />
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Training;

export const getServerSideProps = async () => {
  const pageData = await getPageData(axios.get(`${apiRoutes.VOUCHERS}`));
  const data = pageData?.res;

  return {
    props: {
      ...pageData,
      data,
    },
  };
};
