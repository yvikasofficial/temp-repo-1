/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@/components/Button";
import CartCard from "@/components/CartCard";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import ShowSummary from "@/components/ShowSummary";
import { apiRoutes } from "@/config/apiConfig";
import { setOrder } from "@/store/cart-reducer";
import { getTotalPrice, getUSDFormat } from "@/utils/cartHelper";
import getPageData from "@/utils/getPageData";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import Joi from "joi";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { BarLoader } from "react-spinners";

import VoucherSrc from "@/images/VoucherImage.png";

interface CheckoutProps {}
interface DataType {
  name: string;
  email: string;
}

const Checkout: NextPage<CheckoutProps> = (props: any) => {
  const cart = useSelector((globalState: any) => globalState?.cart);
  console.log(cart?.order);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState({
    loading: false,
    error: false,
    enteredCode: "",
  });
  const [state, setState] = useState({
    fetching: false,
    data: null as any,
  });
  const { fetching } = state;

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const addCoupon = async () => {
    try {
      setCoupon((prevState) => ({ ...prevState, loading: true, error: false }));
      const orderId = cart.order?.id;
      const newItems = [
        ...(cart?.items?.map((el: any) => ({
          product_id: el?.product?.id,
          quantity: el?.selectedSeats,
        })) ?? []),
        ...cart?.order?.line_items?.map((item: any) => ({
          id: item?.id,
          quantity: 0,
        })),
      ];

      const res = await axios.put(`/api/checkout/${orderId}`, {
        coupon_lines: coupon?.enteredCode,
        line_items: newItems,
      });
      dispatch(setOrder(res?.data));
      setCoupon((prevState) => ({
        ...prevState,
        loading: false,
        enteredCode: "",
      }));
    } catch (error) {
      setCoupon((prevState) => ({ ...prevState, loading: false, error: true }));
    }
  };

  const removeCoupon = async () => {
    try {
      setCoupon((prevState) => ({ ...prevState, loading: true, error: false }));
      const orderId = cart.order?.id;
      const newItems = [
        ...(cart?.items?.map((el: any) => ({
          product_id: el?.product?.id,
          quantity: el?.selectedSeats,
        })) ?? []),
        ...cart?.order?.line_items?.map((item: any) => ({
          id: item?.id,
          quantity: 0,
        })),
      ];
      const res = await axios.put(`/api/checkout/${orderId}`, {
        coupon_lines: null,
        line_items: newItems,
      });
      dispatch(setOrder(res?.data));
      setCoupon((prevState) => ({ ...prevState, loading: false }));
    } catch (error) {
      setCoupon((prevState) => ({ ...prevState, loading: false }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prevState) => ({ ...prevState, fetching: true }));

        if (cart.order) {
          const newItems = [
            ...(cart?.items?.map((el: any) => ({
              product_id: el?.product?.id,
              quantity: el?.selectedSeats,
            })) ?? []),
            ...cart?.order?.line_items?.map((item: any) => ({
              id: item?.id,
              quantity: 0,
            })),
          ];
          const res = await axios.put(`/api/checkout/${cart.order?.id}`, {
            payment_method: "authnet",
            payment_method_title: "Credit card",
            line_items: newItems,
          });
          dispatch(setOrder(res?.data));
          setState((prevState) => ({ ...prevState, fetching: false }));
        } else {
          const res = await axios.post("/api/checkout", {
            payment_method: "authnet",
            payment_method_title: "Credit card",
          });
          dispatch(setOrder(res?.data));
          setState((prevState) => ({ ...prevState, fetching: false }));
        }
      } catch (error) {}
    };

    fetchData();
  }, [cart?.trigger]);

  const formSubmit = async (values: any) => {
    try {
      setLoading(true);
      const newItems = [
        ...(cart?.items?.map((el: any) => ({
          product_id: el?.product?.id,
          quantity: el?.selectedSeats,
        })) ?? []),
        ...cart?.order?.line_items?.map((item: any) => ({
          id: item?.id,
          quantity: 0,
        })),
      ];

      const res = await axios.put(`/api/checkout/${cart.order?.id}`, {
        billing: {
          ...values,
        },
        shipping: {
          ...values,
        },
        line_items: newItems,
        coupon_lines: cart?.order?.coupon_lines?.[0]?.code,
      });
      dispatch(setOrder(res?.data));
      window.location = res?.data?.payment_url;
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong! please try again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const schema = Joi.object({
    first_name: Joi.string().min(3).max(100).required().label("First Name"),
    last_name: Joi.string().min(3).max(100).required().label("Last Name"),
    address_1: Joi.string().min(3).max(100).required().label("Street Address"),
    company_name: Joi.string().min(2).max(100).label("Company Name"),
    city: Joi.string().min(2).max(100).required().label("City"),
    state: Joi.string().min(2).max(100).required().label("State"),
    postcode: Joi.string().min(5).max(6).required().label("Postal Zip"),
    phone: Joi.string().min(9).max(13).required().label("Phone"),
    // email: Joi.string()
    //   .email({ tlds: { allow: false } })
    //   .required()
    //   .label("Email of Attendee"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitted },
  }: any = useForm<DataType>({
    resolver: joiResolver(schema),
  });

  const data = [
    {
      title: "First Name",
      placeholder: "First Name",
      name: "first_name",
    },
    {
      title: "Last Name",
      placeholder: "Last Name",
      name: "last_name",
    },
    {
      title: "Company Name",
      placeholder: "Company Name",
      name: "company_name",
      notRequired: true,
    },
    {
      title: "Street Address",
      placeholder: "Street Address",
      name: "address_1",
    },
    {
      title: "City",
      placeholder: "City",
      name: "city",
    },
    {
      title: "State",
      placeholder: "State",
      name: "state",
    },

    {
      title: "Postal Zip",
      placeholder: "Postal Zip",
      name: "postcode",
    },

    {
      title: "Phone",
      placeholder: "xxx-xxx-xxxx",
      name: "phone",
    },
  ];

  if (!hydrated) {
    return null;
  }

  return (
    <Layout {...props}>
      {(loading || coupon?.loading) && (
        <div className="fixed top-0 flex items-center flex-col justify-center left-0 w-[100%] h-screen bg-black z-50 bg-opacity-30">
          <div className="bg-white p-[50px] md:p-[100px] flex items-center gap-[20px] flex-col justify-center rounded-[10px]">
            <div className="text-[#007be9] text-[22px] text-center">
              {coupon?.loading
                ? "Applying the coupon"
                : "Processing the payment"}
            </div>
            <BarLoader color="#007be9" />
          </div>
        </div>
      )}
      <ToastContainer />
      <div className="base-wrapper md:py-[60px] py-[48px]">
        {!fetching && (
          <ShowSummary
            coupon={coupon}
            setCoupon={setCoupon}
            addCoupon={addCoupon}
            removeCoupon={removeCoupon}
          />
        )}
        <h3 className="mb-[28px] md:mb-[36px] title-3">Billing Details</h3>
        {fetching ? (
          <div className="min-h-[40vh] w-full">
            <div className="flex w-[50%] gap-[30px] mb-[20px]">
              <div className="flex-1">
                <Skeleton style={{ width: "100%", height: 140 }} />
              </div>
            </div>
            <div className="flex w-[50%] gap-[30px] mb-[20px]">
              <div className="flex-1">
                <Skeleton style={{ width: "100%", height: 80 }} />
              </div>
            </div>
            <div className="flex w-[50%] gap-[30px]  mb-[10px]">
              <div className="flex-1">
                <Skeleton style={{ width: "70%", height: 20 }} />
              </div>
            </div>
            <div className="flex w-[50%] gap-[30px] ">
              <div className="flex-1">
                <Skeleton style={{ width: "50%", height: 20 }} />
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="flex justify-between pt-[10px] w-full gap-[192px]">
              <div className="w-full 2xl:w-[60%]">
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[20px] 2xl:gap-[48px] mb-[38px]">
                    {data.map((e, i) => {
                      return (
                        <div
                          key={i}
                          className="flex items-start flex-col col-span-2 md:col-span-1 gap-[10px]"
                        >
                          <Input
                            notRequired={e.notRequired ?? false}
                            register={register(e.name)}
                            placeholder={e.placeholder}
                            title={e.title}
                            className="w-full"
                          />
                          {errors[e.name] && (
                            <p className="text-[#FF0D0D] text-[14px]">
                              {errors[e.name].message}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="w-full 2xl:hidden">
                  <button
                    className={`btn-primary text-center body-1 !w-full  ${
                      loading ? "opacity-70 pointer-events-none" : ""
                    }`}
                  >
                    Proceed to payment
                  </button>
                </div>
              </div>
              <div className="flex-col gap-[24px] 2xl:flex hidden w-[40%] ml-auto">
                <div className="cart">Summary</div>
                <div className="bg-[#F5F5F5] p-[24px] pl-0 rounded-[10px] flex gap-[24px] mt-[8px]">
                  <Input
                    value={coupon?.enteredCode}
                    onChange={(e: any) => {
                      setCoupon((state) => ({
                        ...state,
                        enteredCode: e?.target?.value,
                      }));
                    }}
                    placeholder="Apply voucher"
                    className={`bg-white w-full`}
                  />
                  <div
                    onClick={addCoupon}
                    className={`body-1 btn-primary cursor-pointer !h-full ${
                      coupon?.loading || !coupon?.enteredCode
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                  >
                    Apply
                  </div>
                </div>
                {coupon?.error && (
                  <div className="text-red-500">
                    This coupon is either invalid or expired
                  </div>
                )}
                {cart?.order?.coupon_lines?.[0] && (
                  <div className="text-green-500">
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
                <div className="flex flex-col p-[24px] bg-[#F5F5F5] rounded-[10px] gap-[24px]">
                  {cart?.items?.map((item: any, i: any) => {
                    return (
                      <CartCard
                        data={item?.product}
                        count={item?.selectedSeats}
                        key={i}
                      />
                    );
                  })}
                  <div className="border-[1px] mt-[24px]"></div>
                  <div className="flex items-center justify-between">
                    <div className="body-2 text-[#9E9E9E]">Total</div>
                    <div className="name-1">
                      {cart?.order?.coupon_lines?.[0] ? (
                        <>
                          <span className="!text-[18px] line-through opacity-50">
                            {getUSDFormat(
                              getTotalPrice(cart?.items, cart?.order, true)
                            )}
                          </span>
                          &nbsp;
                        </>
                      ) : null}
                      {getUSDFormat(getTotalPrice(cart?.items, cart?.order))}
                    </div>
                  </div>

                  <div className="w-full">
                    <button
                      className={`btn-primary text-center body-1 !w-full  ${
                        loading ? "opacity-70 pointer-events-none" : ""
                      }`}
                    >
                      Proceed to payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
};
// <div className="p-[10x] md:p-[32px] px-0 flex flex-col items-start base-wrapper md:pb-[160px] pb-[80px]">

// </div>

export default Checkout;

export const getServerSideProps = async (props: any) => {
  const myData = await getPageData(() => null);

  return {
    props: {
      ...myData,
    },
  };
};
