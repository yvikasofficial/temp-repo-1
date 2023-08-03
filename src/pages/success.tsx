/* eslint-disable react-hooks/exhaustive-deps */
import { clearStore } from "@/store/cart-reducer";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import checkMarkSrc from "../images/check-mark.svg";
import Image from "next/image";

interface SuccessProps {}

const Success: FC<SuccessProps> = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(clearStore());

    setTimeout(() => {
      router.replace("/");
    }, 3000);
  }, []);
  return (
    <div className="flex items-center justify-center base-wrapper !flex-row">
      <div className="w-[50%] flex flex-col items-center justify-center h-screen">
        <Image src={checkMarkSrc} alt="" className="mb-[32px]" />
        <div className="title-3 mb-[24px]">Success</div>
        <div className="body-1 mb-[40px] md:mb-[36px] 2xl:mb-[52px] text-center">
          You will be redirected to home page in 10 seconds
        </div>
        <div
          className="btn-primary !w-full body-1 text-center"
          onClick={() => router.push("/")}
        >
          Go to Home
        </div>
      </div>
    </div>
  );
};

export default Success;
