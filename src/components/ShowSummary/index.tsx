/* eslint-disable react/no-unescaped-entities */
import { Disclosure } from "@headlessui/react";
import ChevronDownSrc from "../../images/chevron-down.svg";
import Image from "next/image";
import CartCard from "../CartCard";
import Input from "../Input";
import { useSelector } from "react-redux";
import { FC } from "react";

interface ShowSummaryProps {
  coupon: any;
  setCoupon: any;
  addCoupon: any;
  removeCoupon: any;
}

const ShowSummary: FC<ShowSummaryProps> = ({
  coupon,
  setCoupon,
  addCoupon,
  removeCoupon,
}) => {
  const cart = useSelector((globalState: any) => globalState?.cart);

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`flex w-full justify-between items-center rounded-lg bg-[#F5F5F5] text-left px-[20px] md:px-[24px] py-[16px] md:py-[16px] 2xl:hidden ${
              open ? "" : "mb-[48px]"
            }`}
          >
            <div className="sub-heading-1">
              {open ? "Hide summary" : "Show summary"}
            </div>
            <Image
              src={ChevronDownSrc}
              alt=""
              className={`w-[24px] h-[24px] duration-500 ${
                open ? "rotate-0" : "rotate-180"
              } `}
            />
          </Disclosure.Button>
          <Disclosure.Panel
            className={`w-full rounded-b-[10px] 2xl:hidden ${
              open ? "mb-[48px]" : ""
            }`}
          >
            <div className="bg-[#F5F5F5] p-[24px]">
              {cart?.items?.map((item: any, i: any) => {
                return (
                  <CartCard
                    key={i}
                    data={item?.product}
                    count={item?.selectedSeats}
                  />
                );
              })}

              <div className="border-b-[1px] mt-[16px]"></div>
              <div className="bg-[#F5F5F5] p-[24px] pb-0 pl-0 rounded-[10px] flex gap-[24px] mt-[0px] items-center">
                <Input
                  value={coupon?.enteredCode}
                  onChange={(e: any) => {
                    setCoupon((state) => ({
                      ...state,
                      enteredCode: e?.target?.value,
                    }));
                  }}
                  placeholder="Apply voucher"
                  className="bg-white w-full"
                />
                <div
                  onClick={addCoupon}
                  className={`body-1 btn-primary md:px-[32px] py-[12px] px-[20px] md:py-[16px] ${
                    coupon?.loading || !coupon?.enteredCode
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                >
                  Apply
                </div>
              </div>
              {coupon?.error && (
                <div className="text-red-500 mt-[10px]">
                  This coupon is either invalid or expired
                </div>
              )}
              {cart?.order?.coupon_lines?.[0] && (
                <div className="text-green-500 mt-[10px]">
                  Applied code "
                  {cart?.order?.coupon_lines?.[0]?.code?.toUpperCase()}".{" "}
                  <span
                    onClick={removeCoupon}
                    className={`text-red-500 underline cursor-pointer ${
                      coupon?.loading ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    Remove
                  </span>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default ShowSummary;
