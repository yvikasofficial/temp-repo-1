/* eslint-disable react/no-unescaped-entities */
import { Disclosure } from "@headlessui/react";
import ChevronDownSrc from "../../images/chevron-down.svg";
import Image from "next/image";
import CartCard from "../CartCard";
import Input from "../Input";

export default function ShowSummary() {
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
              className={`rotate-180 w-[24px] h-[24px] ${
                open ? "rotate-0 transform" : ""
              } `}
            />
          </Disclosure.Button>
          <Disclosure.Panel
            className={`w-full rounded-b-[10px] 2xl:hidden ${
              open ? "mb-[48px]" : ""
            }`}
          >
            <div className="bg-[#F5F5F5] p-[24px]">
              <CartCard />
              <CartCard />
              <div className="border-b-[1px] mt-[16px]"></div>
              <div className="bg-[#F5F5F5] p-[24px] pb-0 pl-0 rounded-[10px] flex gap-[24px] mt-[0px] items-center">
                <Input
                  placeholder="Apply voucher"
                  className="bg-white w-full"
                />
                <div className="body-1 btn-primary md:px-[32px] py-[12px] px-[20px] md:py-[16px]">
                  Apply
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
