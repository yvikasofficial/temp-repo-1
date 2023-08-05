/* eslint-disable react/jsx-key */
import Layout from "@/components/Layout";
import { NextPage } from "next";
import Input from "@/components/Input";
import CheckBox from "@/components/CheckBox";
import Selector from "@/components/Selector";
import { useForm } from "react-hook-form";
import Joi, { any } from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import getPageData from "@/utils/getPageData";
import Image from "next/image";
import phone from "@/images/phone-grey.svg";
import email from "@/images/mail-grey.svg";
import pin from "@/images/pin-grey.svg";

interface ContactProps {}

interface DataType {
  "First Name": string;
  "Last Name": string;
  Email: string;
  Company: string;
  "Daytime Phone Number": string;
  "How did you hear about us": string;
  "Career Training Programs – Accounting, Office Administration": string;
  "Dedicated Training for my team – Customized Programs": string;
  "Discount Options - Training Vouchers": string;
  "IT Technical Training Programs – CompTIA Certifications": string;
  "One and Two-day classes – All Classes": string;
  "Room Rental": string;
  "Subscribe to: Alliances Monthly Newsletter": string;
}

const Contact: NextPage<ContactProps> = (props) => {
  const [state, setState] = useState({
    loading: false,
  });
  const { loading } = state;

  const schema = Joi.object({
    "First Name": Joi.string().min(3).max(100).required().label("First Name"),
    "Last Name": Joi.string().min(3).max(100).required().label("Last Name"),
    Email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    Company: Joi.string().min(3).max(100).required().label("Company"),
    "Daytime Phone Number": Joi.string()
      .min(3)
      .max(100)
      .required()
      .label("Daytime Phone Number"),
    "How did you hear about us": Joi.valid(),
    "Career Training Programs – Accounting, Office Administration": Joi.valid(),
    "Dedicated Training for my team – Customized Programs": Joi.valid(),
    "Discount Options - Training Vouchers": Joi.valid(),
    "IT Technical Training Programs – CompTIA Certifications": Joi.valid(),
    "One and Two-day classes – All Classes": Joi.valid(),
    "Room Rental": Joi.valid(),
    "Subscribe to: Alliances Monthly Newsletter": Joi.valid(),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  }: any = useForm<DataType>({
    resolver: joiResolver(schema),
  });
  const router = useRouter();

  const formSubmit = (data: any) => {
    let parsedString = ``;

    Object.keys(data).forEach((key) => {
      parsedString += `${key}: ${
        data[key] === "valueOf" ? "Yes" : data[key] === false ? "No" : data[key]
      }\n`;
    });
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    axios({
      method: "post",
      url: `https://alliancecarstg.wpengine.com/?rest_route=/contact-form-7/v1/contact-forms/178/feedback/`,
      data: {
        "your-name": `${data["First Name"]} ${data["Last Name"]}`,
        "your-email": data["Email"],
        "your-subject": "Contact Form",
        "your-message": parsedString,
      },
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        if (response?.data?.status === "mail_sent") {
          setState((prevState) => ({
            ...prevState,
            success: response?.data?.message,
            loading: false,
          }));

          toast.success(response?.data?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          router.push("/");
        } else {
          setState((prevState) => ({
            ...prevState,
            error: response?.data?.invalid_fields,
            loading: false,
          }));
          toast.error("Something went wrong.", {
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
      })
      .catch(function (response) {
        //handle error
      });
  };
  const data = [
    {
      title: "First Name",
      placeholder: "First Name",
    },
    {
      title: "Last Name",
      placeholder: "Last Name",
    },
    {
      title: "Email",
      placeholder: "Your Email",
    },
    {
      title: "Company",
      placeholder: "Your Company",
    },
    {
      title: "Daytime Phone Number",
      placeholder: "xxx-xxx-xxxx",
    },
  ];

  const people = [
    { name: "Wade Cooper" },
    { name: "Arlene Mccoy" },
    { name: "Devon Webb" },
    { name: "Tom Cook" },
    { name: "Tanya Fox" },
    { name: "Hellen Schmidt" },
  ];
  const checkboxData = [
    {
      title: "One and Two-day classes – All Classes",
      id: 1,
    },
    {
      title: "Career Training Programs – Accounting, Office Administration",
      id: 2,
    },
    {
      title: "IT Technical Training Programs – CompTIA Certifications",
      id: 3,
    },
    {
      title: "Dedicated Training for my team – Customized Programs",
      id: 4,
    },
    {
      title: "Discount Options - Training Vouchers",
      id: 5,
    },
    {
      title: "Room Rental",
      id: 6,
    },
  ];
  return (
    <Layout {...props}>
      <ToastContainer />
      <div className="base-wrapper md:mt-[60px] mt-[32px] mb-[80px] md:mb-[160px] 2xl:!flex-row 2xl:gap-[100px]">
        <div className="2xl:w-[60%]">
          <div className="title-1">Contact us</div>
          <form
            className="grid grid-cols-2 gap-[16px] md:gap-[48px] md:mt-[34px] mt-[24px]"
            onSubmit={handleSubmit(formSubmit)}
          >
            {data.map((e, i) => {
              return (
                <div
                  key={i}
                  className="flex flex-col col-span-2 md:col-span-1 gap-[10px]"
                >
                  <Input
                    register={register(e.title)}
                    placeholder={e.placeholder}
                    title={e.title}
                  />
                  {errors[e.title] && (
                    <p className="text-[#FF0D0D] text-[14px]">
                      {errors[e.title].message}
                    </p>
                  )}
                </div>
              );
            })}
            <div className="flex flex-col col-span-2 md:col-span-1 gap-[10px]">
              <label className="label">How did you hear about us? </label>
              <Selector
                register={register("How did you hear about us")}
                placeholder={"Choose Option"}
                data={people}
              />
            </div>
            <div className="col-span-2 flex flex-col gap-[18px]">
              <CheckBox
                register={register("Subscribe To Newsletter")}
                title="Subscribe To Newsletterr"
              />
            </div>
            <button
              disabled={loading}
              type={"submit"}
              className="col-span-2 rounded-[6px] btn-primary !w-full"
            >
              Submit{" "}
            </button>
          </form>
        </div>
        <div className="flex flex-col mt-[80px] md:mt-[76px] 2xl:w-[40%]">
          <div className="grid grid-cols-1 2xl:grid-cols-1 md:grid-cols-2">
            <div className="flex gap-[16px] mb-[16px] md:mb-[24px]">
              <Image src={phone} alt="" />
              <div className="body-1">+1 (831) 755-8200</div>
            </div>
            <div className="flex gap-[16px] mb-[24px]">
              <Image src={email} alt="" />
              <div className="body-1">contactus@alliancetrains.com</div>
            </div>
            <div className="2xl:hidden flex gap-[16px] mb-[24px]">
              <Image src={pin} alt="" />
              <div className="body-1">
                333-B Abbott Street, Salinas, CA 93901
              </div>
            </div>
          </div>
          <iframe
            className="bg-[#e6e6e6] rounded-[10px] mx-auto w-full"
            src="https://www.google.com/maps/d/embed?mid=1J2jOyIb1SxrBp5i_32BinDrmn028v-8&hl=en&ehbc=2E312F"
            width="495px"
            height="454px"
          ></iframe>
          <div className="hidden 2xl:flex mt-[16px] mb-[24px]">
            <Image src={pin} alt="" />
            <div className="body-1">333-B Abbott Street, Salinas, CA 93901</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;

export const getServerSideProps = async () => {
  const res = await getPageData();

  return {
    props: {
      ...res,
    },
  };
};
