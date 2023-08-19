import { ProductType } from "@/interfaces";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { FC, Fragment, useState } from "react";

import PlusSrc from "@/images/Plus.svg";
import MinusSrc from "@/images/Minus.svg";
import { addItemToCart, toggleCart } from "@/store/cart-reducer";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import closeGrey from "../../images/close-grey.svg";
import { getUSDFormat } from "@/utils/cartHelper";

interface AddVoucherModalProps {
  onClose: any;
  open: boolean;
  data: ProductType;
}

const AddVoucherModal: FC<AddVoucherModalProps> = ({ onClose, open, data }) => {
  const [selectedSeats, setSelectedSeats] = useState(1);

  const dispatch = useDispatch();

  const formSubmit = () => {
    dispatch(
      addItemToCart({
        product: data,
        selectedSeats,
        selectedDate: "N/A",
      })
    );
    toast.success("Course added to the cart", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    onClose();
    setTimeout(() => {
      dispatch(toggleCart());
    }, 100);
  };

  return (
    <>
      <ToastContainer />
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto z-[1000]">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform w-[100%] 2xl:w-max overflow-hidden rounded-2xl bg-white md:p-6 text-left align-middle shadow-xl transition-all">
                  <div className="md:py-[60px] py-[32px] px-[24px] md:px-[80px]">
                    <form>
                      <div className="flex items-center justify-between mb-[60px]">
                        <h3 className="heading-2 ">Class Schedule</h3>
                        <Image
                          onClick={onClose}
                          src={closeGrey}
                          alt=""
                          className="cursor-pointer"
                        />
                      </div>
                      <div className="flex md:gap-[96px] 2xl:flex-row flex-col">
                        <div className="flex flex-col flex-1">
                          <div className="sub-heading-2 md:mt-0 mt-[40px]">
                            Number of Vouchers
                          </div>
                          <div className="flex justify-between items-center mt-[16px] w-full">
                            <div className="flex  w-full gap-[16px]">
                              <div
                                onClick={() => {
                                  if (selectedSeats > 1) {
                                    setSelectedSeats(selectedSeats - 1);
                                  }
                                }}
                                className=" cursor-pointer flex items-center justify-center px-[20px] py-[12px] md:px-[32px] md:py-[16px] border-[1px] border-black rounded-[10px]"
                              >
                                <Image
                                  className="w-[32px] h-[32px] "
                                  src={MinusSrc}
                                  alt=""
                                />
                              </div>
                              <div className="w-full border-[1px] rounded-[10px] flex items-center justify-center">
                                {selectedSeats}
                              </div>
                              <div
                                onClick={() => {
                                  setSelectedSeats(selectedSeats + 1);
                                }}
                                className="rounded-[10px] cursor-pointer bg-[#007BE9] border-[#007BE9] flex items-center justify-center px-[20px] py-[12px] md:px-[32px] md:py-[16px] border-[1px] "
                              >
                                <Image
                                  className="w-[32px] h-[32px]"
                                  src={PlusSrc}
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex lg:mt-[40px]">
                        <div className="flex lg:flex-row flex-col flex-1 items-center justify-between lg:!w-[60%]">
                          <div className="flex lg:my-0 mt-[40px] justify-between mb-[16px] gap-[16px] items-center !w-full">
                            <div className="lg:block hidden heading-2 text-[#9E9E9E]">
                              Total
                            </div>
                            <div className="lg:block hidden heading-1 mr-[16px]">
                              {/* @ts-ignore */}
                              {getUSDFormat(data?.price * selectedSeats)}
                            </div>
                            <div className="lg:hidden sub-heading-2 text-[#9E9E9E]">
                              Total
                            </div>
                            <div className="lg:hidden title-2">
                              {/* @ts-ignore */}
                              {getUSDFormat(data?.price * selectedSeats)}
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              formSubmit();
                            }}
                            type="button"
                            className="btn-primary body-1 !w-full px-[20px] py-[12px] md:px-[32px] md:py-[16px] "
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                      {/* <div className="gap-[10px] items-end md:items-center border-[#D3D3D3] pt-[20px] flex-col md:flex-row flex justify-between">
                        <div className="flex gap-[16px] items-center">
                          <span className="text-[20px]">Total</span>
                          <h3 className="text-[40px]">${data?.price}</h3>
                        </div>
                        <Button

                        // type={"submit"}
                        // fill={"blue"}
                        // className="md:!w-max rounded-[5px] px-[52px]"
                        >
                          Add to Cart
                        </Button>
                      </div> */}
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddVoucherModal;
