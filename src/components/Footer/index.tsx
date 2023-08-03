import { FC } from "react";
import logo from "../../images/logo-white.svg";
import Image from "next/image";
import pin from "../../images/pin.svg";
import facebook from "../../images/facebook.svg";
import phone from "../../images/phone.svg";
import twitter from "../../images/twitter.svg";
import youtube from "../../images/youtube.svg";
import linkedin from "../../images/linkedin.svg";
import { FooterType } from "@/interfaces";
import { useRouter } from "next/router";

interface FooterProps {
  data?: FooterType;
}

const Footer: FC<FooterProps> = ({ data }) => {
  const router = useRouter();

  return (
    <div className="bg-[#104879] pt-[60px] text-white rounded-tl-[10px] rounded-tr-[10px] pb-[32px]">
      <div className="base-wrapper">
        <Image src={logo} alt="" className="" />
        <p className="text-[#7091AF] md:hidden mt-[16px]">
          {data?.acf?.new_description}
        </p>
        <div className="flex mt-[40px] md:mt-[36px] justify-between">
          <div className="hidden md:flex flex-col body-1 w-[40%]">
            <p className="text-[#7091AF] ">{data?.acf?.new_description}</p>
            <div className="flex gap-[16px] mt-[36px] ">
              <Image alt="" src={pin} />
              <p>{data?.acf?.contact?.address}</p>
            </div>
            <div className="flex gap-[16px] mt-[24px]">
              <Image alt="" src={phone} />
              <p>{data?.acf?.contact?.phone}</p>
            </div>
            <div className="flex gap-[48px] mt-[36px]">
              <Image
                className="w-[32px] h-[32px] cursor-pointer"
                alt=""
                onClick={() => window.open(data?.acf?.social?.facebook)}
                src={facebook}
              />
              <Image
                className="w-[32px] h-[32px] cursor-pointer"
                alt=""
                onClick={() => window.open(data?.acf?.social?.youtube)}
                src={youtube}
              />
              <Image
                className="w-[32px] h-[32px] cursor-pointer"
                alt=""
                onClick={() => window.open(data?.acf?.social?.linked_in)}
                src={linkedin}
              />
              <Image
                className="w-[32px] h-[32px] cursor-pointer"
                alt=""
                onClick={() => window.open(data?.acf?.social?.twitter)}
                src={twitter}
              />
            </div>
          </div>
          <div className="flex md:flex-row flex-wrap justify-between md:w-[45%]">
            <div className="flex flex-col body-1 gap-[16px] w-[50%] md:w-max">
              <p className="sub-heading-2 opacity-[0.4000000059604645] mb-[8px]">
                Product
              </p>
              {data?.acf?.product?.map((item, i) => {
                return (
                  <p
                    onClick={() => router.push(item?.url)}
                    key={i}
                    className="cursor-pointer"
                  >
                    {item?.label}
                  </p>
                );
              })}
            </div>
            <div className="flex flex-col body-1 gap-[16px]">
              <p className="sub-heading-2 opacity-[0.4000000059604645] mb-[8px]">
                Company
              </p>
              {data?.acf?.company?.map((item, i) => {
                return (
                  <p
                    onClick={() => router.push(item?.url)}
                    key={i}
                    className="cursor-pointer"
                  >
                    {item?.label}
                  </p>
                );
              })}
            </div>
            <div className="flex flex-col body-1 gap-[16px]">
              <p className="sub-heading-2 opacity-[0.4000000059604645] mb-[8px]">
                Important links
              </p>
              {data?.acf?.important_links?.map((item, i) => {
                return (
                  <p
                    onClick={() => router.push(item?.url)}
                    key={i}
                    className="cursor-pointer"
                  >
                    {item?.label}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <div className="md:hidden flex gap-[16px] mt-[36px] border-t-[2px] border-[#1B5689] pt-[32px]">
          <Image alt="" className="w-[24px] h-[24px]" src={pin} />
          <p>{data?.acf?.contact?.address}</p>
        </div>
        <div className="md:hidden flex gap-[16px] mt-[24px]">
          <Image alt="" className="w-[24px] h-[24px]" src={phone} />
          <p>{data?.acf?.contact?.phone}</p>
        </div>
        <div className="md:hidden flex gap-[24px] mx-auto mt-[36px]">
          <Image
            className="w-[32px] h-[32px] cursor-pointer"
            alt=""
            onClick={() => window.open(data?.acf?.social?.facebook)}
            src={facebook}
          />
          <Image
            className="w-[32px] h-[32px] cursor-pointer"
            alt=""
            onClick={() => window.open(data?.acf?.social?.youtube)}
            src={youtube}
          />
          <Image
            className="w-[32px] h-[32px] cursor-pointer"
            alt=""
            onClick={() => window.open(data?.acf?.social?.linked_in)}
            src={linkedin}
          />
          <Image
            className="w-[32px] h-[32px] cursor-pointer"
            alt=""
            onClick={() => window.open(data?.acf?.social?.twitter)}
            src={twitter}
          />
        </div>
        <div className="flex md:flex-row flex-col-reverse md:items-center mt-[60px] gap-[16px] md:gap-[66px]">
          <div className="small-2 md:hidden opacity-[0.4000000059604645]">
            {data?.acf?.copyright}
          </div>
          <div className="small-2 md:hidden opacity-[0.4000000059604645]">
            Privacy & Policy
          </div>
          <div className="label md:block hidden">{data?.acf?.copyright}</div>
          <div className="label md:block hidden">Privacy & Policy</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
