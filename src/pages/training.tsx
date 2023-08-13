import Layout from "@/components/Layout";
import getPageData from "@/utils/getPageData";
import { NextPage } from "next";

interface TrainingProps {}

const Training: NextPage<TrainingProps> = (props: any) => {
  return (
    <Layout {...props}>
      <div className="md:my-[80px] my-[160px] base-wrapper">
        <div className="title-1">Alliance training vouchers</div>
        <div className="mt-[36px] 2xl:w-[80%] body-1 ">
          We offer discount training vouchers to any companies who would like to
          take multiple classes. Our vouchers do not expire, and can be used for
          any class, at any time. You will usually receive them within four or
          five business days.
        </div>
        <div className="flex md:flex-row flex-col 2xl:gap-[48px] gap-[8px] md:gap-[20px] 2xl:mt-[60px] mt-[40px] ">
          <div className="px-[20px] py-[16px] md:px-[24px] 2xl:py-[24px] 2xl:px-[32px] bg-[#F5F5F5] gap-[16px] justify-between flex-1 flex items-center rounded-[10px]">
            <div className="cart">10 class vouchers</div>
            <div className="flex items-center gap-[12px]">
              <div className="name-1">$3,650</div>
              <div className="font-[20px] text-[#9E9E9E]">$3,650</div>
            </div>
          </div>
          <div className="px-[20px] py-[16px] md:px-[24px] 2xl:py-[24px] 2xl:px-[32px] bg-[#F5F5F5] gap-[16px] justify-between flex-1 flex items-center rounded-[10px]">
            <div className="cart">10 class vouchers</div>
            <div className="flex items-center gap-[12px]">
              <div className="name-1">$3,650</div>
              <div className="font-[20px] text-[#9E9E9E]">$3,650</div>
            </div>
          </div>
        </div>
        <div className="heading-2 2xl:mt-[60px] mt-[40px]">
          Using training vouchers
        </div>
        <div className="2xl:w-[80%] body-1 md:mt-[32px] mt-[16px]">
          Give the student the class voucher(s), marked with the student’s name,
          class name, and class date. The student must bring the voucher to the
          class. If the student does not bring the voucher, we will still allow
          them into the class if they sign a form promising to send in the
          voucher. If we don’t receive the voucher within 5 days after the
          class, our Accounting Department will bill for the class. Please help
          us avoid this extra work.
        </div>
        <div className="heading-2 2xl:mt-[60px] mt-[40px]">
          Using training vouchers
        </div>
        <div className="2xl:w-[80%] body-1 md:mt-[32px] mt-[16px]">
          Give the student the class voucher(s), marked with the student’s name,
          class name, and class date. The student must bring the voucher to the
          class. If the student does not bring the voucher, we will still allow
          them into the class if they sign a form promising to send in the
          voucher. If we don’t receive the voucher within 5 days after the
          class, our Accounting Department will bill for the class. Please help
          us avoid this extra work.
        </div>
        <div className="heading-2 2xl:mt-[60px] mt-[40px]">
          Using training vouchers
        </div>
        <div className="2xl:w-[80%] body-1 md:mt-[32px] mt-[16px]">
          Give the student the class voucher(s), marked with the student’s name,
          class name, and class date. The student must bring the voucher to the
          class. If the student does not bring the voucher, we will still allow
          them into the class if they sign a form promising to send in the
          voucher. If we don’t receive the voucher within 5 days after the
          class, our Accounting Department will bill for the class. Please help
          us avoid this extra work.
        </div>
      </div>
    </Layout>
  );
};

export default Training;

export const getServerSideProps = async (props: any) => {
  const myData = await getPageData(() => null);

  return {
    props: {
      ...myData,
    },
  };
};
