import { ProductType } from "@/interfaces";
import { Dialog, Transition } from "@headlessui/react";
import moment from "moment";
import Image from "next/image";
import { FC, Fragment, useState } from "react";

import PlusSrc from "@/images/Plus.svg";
import MinusSrc from "@/images/Minus.svg";
import clock from "../../images/clock-light.svg";
import Input from "../Input";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { addItemToCart, toggleCart } from "@/store/cart-reducer";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import closeGrey from "../../images/close-grey.svg";
import { getUSDFormat } from "@/utils/cartHelper";
import DaySelector from "../DaySelector";

interface AddToCartModalProps {
  onClose: any;
  open: boolean;
  data: ProductType;
}

const AddToCartModal: FC<AddToCartModalProps> = ({ onClose, open, data }) => {
  interface DataType {
    name: string;
    email: string;
  }

  const dateMap: any = {};
  data?.course_start_dates?.forEach((el) => {
    dateMap[moment(el?.date).format("MM/DD/YYYY")] = true;
  });

  const sortedDates = [...data?.course_start_dates].sort(function (a, b) {
    // @ts-ignore
    return new Date(a.date) - new Date(b.date);
  });
  const mostRecentDate = sortedDates?.find(
    (data) => moment(data?.date) > moment()
  );

  const [selectedDate, setSelectedDate] = useState(mostRecentDate);

  const [selectedSeats, setSelectedSeats] = useState(1);
  const showBoth = data?.in_person && data?.remote_class;
  const [classType, setClassType] = useState(
    data?.in_person ? "in_person" : "remote_class"
  );
  const router = useRouter();
  const dispatch = useDispatch();

  const formSubmit = (values: any) => {
    dispatch(
      addItemToCart({
        product: data,
        selectedDate,
        selectedSeats,
        ...values,
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

  const generateSchema = () => {
    const map: any = {};

    new Array(selectedSeats).fill(0).forEach((_, i) => {
      map[`name_${i}`] = Joi.string()
        .min(3)
        .max(100)
        .required()
        .label("Full Name of Attendee");
      map[`email_${i}`] = Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .label("Email of Attendee");
    });

    return map;
  };

  const schema = Joi.object(generateSchema());

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitted },
  }: any = useForm<DataType>({
    resolver: joiResolver(schema),
  });

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
                    <form onSubmit={handleSubmit(formSubmit)}>
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
                        <div className="flex flex-col md:min-w-[400px]">
                          <DaySelector
                            onChange={(value: any) => {
                              setSelectedDate(value);
                            }}
                            value={selectedDate}
                            data={data}
                            dates={sortedDates?.filter(
                              (data) => moment(data?.date) > moment()
                            )}
                          />
                        </div>
                        <div className="flex flex-col flex-1">
                          <div className="sub-heading-2 md:mt-0 mt-[40px]">
                            Number of attendees
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
                          <div className="sub-heading-2 mt-[36px]">
                            Attendance
                          </div>
                          {showBoth && (
                            <div className="flex mt-[16px] gap-[16px]">
                              <div
                                onClick={() => setClassType("in_person")}
                                className={`btn-secondary body-1 flex-1 text-center px-[20px] py-[12px] md:px-[32px] md:py-[16px] ${
                                  classType === "in_person"
                                    ? "!bg-[#007BE9] !text-white !border-[#007BE9]"
                                    : "hover:!bg-inherit hover:!text-inherit"
                                }`}
                              >
                                In person
                              </div>
                              <div
                                onClick={() => setClassType("remote_class")}
                                className={`btn-secondary body-1 flex-1 text-center  px-[20px] py-[12px] md:px-[32px] md:py-[16px] ${
                                  classType === "remote_class"
                                    ? "!bg-[#007BE9] !text-white !border-[#007BE9]"
                                    : "hover:!bg-inherit hover:!text-inherit"
                                }`}
                              >
                                Remote
                              </div>
                            </div>
                          )}
                          {new Array(selectedSeats).fill(0).map((_, i) => {
                            return (
                              <div
                                key={i}
                                className="flex flex-col lg:flex-row gap-[32px] lg:border-none border-b-[1px] border-[#E0E0E0] last:border-none pb-[24px] pt-[36px]"
                              >
                                <div className="flex-1 flex flex-col col-span-2 md:col-span-1 gap-[10px]">
                                  <Input
                                    register={register(`name_${i}`)}
                                    placeholder={"Full Name"}
                                    title={`Full Name of Attendee`}
                                    className=" px-[20px] py-[12px] md:px-[32px] md:py-[16px]"
                                  />
                                  {errors[`name_${i}`] && (
                                    <p className="text-[#FF0D0D] text-[14px]">
                                      {errors[`name_${i}`].message}
                                    </p>
                                  )}
                                </div>
                                <div className="flex-1 flex flex-col col-span-2 md:col-span-1 gap-[10px]">
                                  <Input
                                    register={register(`email_${i}`)}
                                    placeholder={"Email"}
                                    title={`Email of Attendee`}
                                  />
                                  {errors[`email_${i}`] && (
                                    <p className="text-[#FF0D0D] text-[14px]">
                                      {errors[`email_${i}`].message}
                                    </p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex lg:mt-[40px]">
                        <div className="w-[40%] lg:block hidden"></div>
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
                            type="submit"
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

export default AddToCartModal;
