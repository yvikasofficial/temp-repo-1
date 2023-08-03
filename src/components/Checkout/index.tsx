import { getTotalPrice, getUSDFormat } from "@/utils/cartHelper";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Input from "../Input";
import Button from "../Button";
import Image from "next/image";

import axios from "axios";
import { setOrder } from "@/store/cart-reducer";
import { ToastContainer, toast } from "react-toastify";

interface CheckoutProps {}

interface DataType {
  name: string;
  email: string;
}

const Checkout: FC<CheckoutProps> = () => {
  const cart = useSelector((globalState: any) => globalState?.cart);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <ToastContainer />
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="p-[10x] md:p-[32px]">
          <form onSubmit={handleSubmit(formSubmit)}>
            <div>
              <h3 className="text-[20px] mb-[28px] md:text-[24px] md:mb-[36px]">
                Billing Details
              </h3>
              <div className="grid grid-cols-2 gap-[30px] mb-[38px]">
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
        </div>
      </div>
    </div>
  );
};

export default Checkout;
