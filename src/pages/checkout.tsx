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

interface CheckoutProps {}
interface DataType {
  name: string;
  email: string;
}

const Checkout: NextPage<CheckoutProps> = (props: any) => {
  const cart = useSelector((globalState: any) => globalState?.cart);
  console.log(cart);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    fetching: false,
    data: null as any,
  });
  const { fetching } = state;

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prevState) => ({ ...prevState, fetching: true }));
        if (cart.order) {
          const res = await axios.put(`/api/checkout/${cart.order?.id}`, {
            payment_method: "authnet",
            payment_method_title: "Credit card",
            line_items: cart?.items?.map((el: any) => ({
              product_id: el?.product?.id,
              quantity: el?.selectedSeats,
            })),
            shipping_lines: [
              {
                method_id: "flat_rate",
                method_title: "Flat Rate",
                total: `${getTotalPrice(cart?.items)}`,
              },
            ],
          });
          console.log(res?.data);
          setState((prevState) => ({ ...prevState, fetching: false }));
        } else {
          const res = await axios.post("/api/checkout", {
            payment_method: "authnet",
            payment_method_title: "Credit card",
            line_items: cart?.items?.map((el: any) => ({
              product_id: el?.product?.id,
              quantity: el?.selectedSeats,
            })),
            shipping_lines: [
              {
                method_id: "flat_rate",
                method_title: "Flat Rate",
                total: `${getTotalPrice(cart?.items)}`,
              },
            ],
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
      toast.loading("Processing your order. Please wait.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLoading(true);
      const res = await axios.post("/api/checkout", {
        payment_method: "authnet",
        payment_method_title: "Credit card",
        billing: {
          ...values,
        },
        shipping: {
          ...values,
        },
        line_items: cart?.items?.map((el: any) => ({
          product_id: el?.product?.id,
          quantity: el?.selectedSeats,
        })),
        shipping_lines: [
          {
            method_id: "flat_rate",
            method_title: "Flat Rate",
            total: `${getTotalPrice(cart?.items)}`,
          },
        ],
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
      <ToastContainer />
      <div className="p-[10x] md:p-[32px] flex flex-col items-start base-wrapper md:pb-[160px] pb-[80px]">
        <ShowSummary />
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
          <div className="flex justify-between pt-[10px] w-full gap-[80px]">
            <form
              onSubmit={handleSubmit(formSubmit)}
              className="w-full 2xl:w-[55%]"
            >
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[30px] mb-[38px]">
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
              <div className="flex justify-end">
                <Button
                  disabled={loading}
                  // fill="blue"
                  // className="rounded-[5px] px-[80px] !w-max"
                >
                  Complete Order ({getUSDFormat(getTotalPrice(cart?.items))})
                </Button>
              </div>
            </form>
            <div className="flex-col gap-[24px] 2xl:flex hidden w-[45%]">
              <div className="cart">Summary</div>
              <div className="bg-[#F5F5F5] p-[24px] pl-0 rounded-[10px] flex gap-[24px] mt-[8px]">
                <Input
                  placeholder="Apply voucher"
                  className="bg-white w-full"
                />
                <div className="body-1 btn-primary !h-full">Apply</div>
              </div>
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
                    {getUSDFormat(getTotalPrice(cart?.items))}
                  </div>
                </div>
                <div className="btn-primary !w-full">Proceed to payment</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Checkout;

export const getServerSideProps = async (props: any) => {
  const myData = await getPageData(() => null);

  return {
    props: {
      ...myData,
    },
  };
};
