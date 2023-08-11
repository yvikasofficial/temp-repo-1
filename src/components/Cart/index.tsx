import Image from "next/image";
import { FC, useState } from "react";
import CartCard from "../CartCard";
import bigCart from "../../images/big-cart.svg";

import close from "@/images/close.svg";
import logo from "@/images/logo.png";
import closeGrey from "@/images/close-grey.svg";
import CartSrc from "@/images/cart.svg";

import SimpleBar from "simplebar-react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { removeItemFromCart, toggleCart } from "@/store/cart-reducer";
import { getTotalPrice, getUSDFormat } from "@/utils/cartHelper";

import { Popover, Transition } from "@headlessui/react";
import { useRouter } from "next/router";

interface CartProps {
  active?: boolean;
  onClose?: any;
}

const Cart: FC<CartProps> = () => {
  const cart = useSelector((globalState: any) => globalState.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <>
      {cart?.visible && (
        <div
          onClick={() => {
            dispatch(toggleCart());
          }}
          className="hidden 2xl:block fixed top-0 left-0 w-full h-screen"
        ></div>
      )}
      {/* desktop view */}
      <div className="relative hidden 2xl:block">
        <Popover>
          {({ open }) => (
            <>
              <Popover.Button
                as="div"
                className={`2xl:block hidden`}
                onClick={() => {
                  dispatch(toggleCart());
                }}
              >
                <Image
                  src={CartSrc}
                  alt=""
                  className="w-[40px] h-[40px] cursor-pointer"
                />
              </Popover.Button>
              <Transition
                show={cart?.visible}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Popover.Panel
                  className={`absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 translate-x-[0%] z-[10001] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none outline-none w-max bg-[#F5F5F5] rounded-[10px] `}
                >
                  <>
                    {cart?.items?.length > 0 ? (
                      <div className="flex flex-col px-[5vw] gap-[60px] my-[60px] min-w-[515px]">
                        <div className="flex items-center justify-between w-full">
                          <div className="heading-2 flex gap-[16px] ">
                            Cart{" "}
                            <div className="heading-2 text-[#9E9E9E]">
                              ({cart?.items?.length})
                            </div>
                          </div>
                          <Image
                            className="cursor-pointer"
                            onClick={() => dispatch(toggleCart())}
                            src={closeGrey}
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col gap-[16px] ">
                          {cart?.items?.map((item: any, i: any) => {
                            return (
                              <div key={i} className="flex gap-[24px]">
                                <Image
                                  className="cursor-pointer"
                                  onClick={() =>
                                    dispatch(
                                      removeItemFromCart({
                                        ...item?.product,
                                        trigger: true,
                                      })
                                    )
                                  }
                                  src={closeGrey}
                                  alt=""
                                />
                                <div className="px-[32px] py-[16px] rounded-[10px] bg-white w-full flex gap-[24px] items-center">
                                  <Image
                                    width={92}
                                    height={92}
                                    src={item?.product?.image}
                                    alt=""
                                    className="w-[62px] h-[62px] bg-slate-200"
                                  />
                                  <div className="flex flex-col justify-between gap-[16px] w-[220px]">
                                    <div className="sub-heading-2">
                                      {item?.product?.name}
                                    </div>
                                    <div className="label">
                                      {item?.product?.duration} course
                                    </div>
                                  </div>
                                  <div className="sub-heading-1">
                                    {getUSDFormat(item?.product?.price)}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex flex-col gap-[24px]">
                          <div className="flex items-center justify-between">
                            <div className="body-2 text-[#9E9E9E]">Total </div>
                            <div className="name-1 lg:block hidden">
                              {getUSDFormat(getTotalPrice(cart?.items))}
                            </div>
                            <div className="title-2 lg:hidden block">
                              {getUSDFormat(getTotalPrice(cart?.items))}
                            </div>
                          </div>
                          <div
                            onClick={() => router.push("/checkout")}
                            className="btn-primary !w-full text-center body-1"
                          >
                            Checkout
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-col px-[48px] py-[32px] items-center justify-center h-max min-w-[515px]">
                          <div className="flex items-center justify-between w-full mb-[60px]">
                            <div className="heading-2 flex gap-[16px] ">
                              Cart{" "}
                              <div className="heading-2 text-[#9E9E9E]">
                                ({cart?.items?.length})
                              </div>
                            </div>
                            <Image
                              className="cursor-pointer"
                              onClick={() => dispatch(toggleCart())}
                              src={closeGrey}
                              alt=""
                            />
                          </div>
                          <Image
                            src={bigCart}
                            alt=""
                            className="w-[120px] h-[120px]"
                          />
                          <div className="heading-2 mt-[32px] md:mt-[60px]">
                            Your cart is empty
                          </div>
                          <div className="body-1 mt-[12px] md:mt-[16px]">
                            You haven’t added any items yet
                          </div>
                          <Link
                            onClick={() => {
                              dispatch(toggleCart());
                            }}
                            href="/courses"
                            className="w-full"
                          >
                            <div className="btn-primary body-1 mt-[40px] md:mt-[52px] !w-full text-center">
                              Explore our courses
                            </div>
                          </Link>
                        </div>
                      </>
                    )}
                  </>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
      {/* mobile view */}
      <div className="relative 2xl:hidden">
        <Image
          src={CartSrc}
          alt=""
          className={`w-[32px] h-[32px] 2xl:hidden ${
            cart?.visible ? "hidden" : ""
          }`}
          onClick={() => dispatch(toggleCart())}
        />
        {cart?.visible && (
          <div
            className={`flex 2xl:hidden flex-col fixed top-0 left-0 w-full h-screen bg-white z-[100] transition-all  duration-300 ${
              cart?.visible ? "translate-y-0" : "-translate-y-[100%] hidden"
            }`}
          >
            <div className="base-wrapper">
              <div className="h-[52px] my-[40px] flex flex-row py-[24px] md:py-[32px] gap-[10px] items-center 2xl:justify-normal justify-between z-[10] ">
                <Image
                  onClick={() => dispatch(toggleCart())}
                  src={close}
                  alt=""
                  className="md:w-[40px] cursor-pointer w-[32px] h-[32px] md:h-[40px] 2xl:hidden block"
                />
                <Image src={logo} alt="" className="w-[133px] h-[40px]" />
                <Image
                  onClick={() => dispatch(toggleCart())}
                  src={CartSrc}
                  alt=""
                  className="w-[32px] h-[32px] 2xl:hidden block cursor-pointer"
                />
              </div>
              <SimpleBar style={{ height: "100vh" }}>
                <>
                  {cart?.items?.length > 0 ? (
                    <div className="2xl:hidden flex flex-col px-[0px] gap-[48px] h-[80vh] md:pb-[24px]">
                      <div className="heading-2 flex gap-[16px]">
                        Cart{" "}
                        <div className="heading-2 text-[#9E9E9E]">
                          ({cart?.items?.length})
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <SimpleBar style={{ maxHeight: 500 }}>
                          <div className="flex flex-col gap-[16px]">
                            {cart?.items?.map((item: any, i: any) => {
                              return (
                                <CartCard
                                  key={i}
                                  count={item?.selectedSeats}
                                  data={item?.product}
                                />
                              );
                            })}
                          </div>
                        </SimpleBar>
                        <div className="2xl:hidden flex flex-col gap-[24px]">
                          <div className="flex items-center justify-between">
                            <div className="sub-heading-2 text-[#9E9E9E]">
                              Total{" "}
                            </div>
                            <div className="title-2 block">
                              {getUSDFormat(getTotalPrice(cart?.items))}
                            </div>
                          </div>
                          <div
                            onClick={() => router.push("/checkout")}
                            className="btn-primary !w-full text-center body-1"
                          >
                            Checkout
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="2xl:hidden flex flex-col items-center justify-center h-[80vh]">
                        <Image src={bigCart} alt="" />
                        <div className="heading-2 mt-[32px] md:mt-[60px]">
                          Your cart is empty
                        </div>
                        <div className="body-1 mt-[12px] md:mt-[16px]">
                          You haven’t added any items yet
                        </div>
                        <Link
                          onClick={() => {
                            dispatch(toggleCart());
                          }}
                          href="/courses"
                          className="w-full"
                        >
                          <div className="btn-primary body-1 mt-[40px] md:mt-[52px] md:w-max !w-full text-center">
                            Explore our courses
                          </div>
                        </Link>
                      </div>
                    </>
                  )}
                </>
              </SimpleBar>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
