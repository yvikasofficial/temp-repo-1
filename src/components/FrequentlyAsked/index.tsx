/* eslint-disable @next/next/no-img-element */
import { Disclosure, Transition } from "@headlessui/react";
import { FC, useState } from "react";
import dorpDown from "../../images/up.png";
import phone from "../../images/phone-black.png";
import mail from "../../images/mail.png";
import Image from "next/image";
import { FooterType } from "@/interfaces";

interface FrequentlyAskedProps {
  data: any;
  footer: FooterType;
}

const FrequentlyAsked: FC<FrequentlyAskedProps> = ({ data, footer }) => {
  return (
    <>
      <div className="title-2">
        We’ve got the answers
        <br /> to your questions.
      </div>
      <div className="flex mt-[24px] md:mt-[60px] gap-[114px]">
        <div className="w-[40%] 2xl:flex flex-col hidden">
          <div className="body-1">
            If you can’t find the answer you’re looking for, feel free to call
            or email us:
          </div>
          <div className="flex gap-[16px] mt-[36px]">
            <Image src={phone} alt="" />
            <div className="body-1">
              <a href={`tel:${footer?.acf?.contact?.phone}`}>
                {footer?.acf?.contact?.phone}
              </a>
            </div>
          </div>
          <div className="flex gap-[16px] mt-[24px]">
            <Image src={mail} alt="" />
            <div className="body-1">
              <a href={`mailto:${footer?.acf?.contact?.email}`}>
                {footer?.acf?.contact?.email}
              </a>
            </div>
          </div>{" "}
        </div>
        <div className="w-full mx-auto 2xl:w-[60%] flex flex-col ">
          {data?.faqs?.map((item: any, i: any) => {
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
                        <p className="body-1 md:block hidden">{item?.answer}</p>
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
          <div className="btn-primary 2xl:hidden !w-full text-center mt-[40px]">
            Submit query
          </div>
        </div>
      </div>
    </>
  );
};

export default FrequentlyAsked;
