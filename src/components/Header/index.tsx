/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useState } from "react";
import logo from "../../images/logo.png";
import cart from "../../images/cart.svg";
import cartBlue from "../../images/cart-blue.svg";
import menu from "../../images/menu.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import CoursesPopover from "../CoursePopOver";
import SearchSrc from "@/images/search.svg";
import close from "@/images/close.svg";
import Cart from "../Cart";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "@/store/cart-reducer";
import { CategoryType } from "@/interfaces";
import SimpleBar from "simplebar-react";

interface HeaderProps {
  categories?: CategoryType[];
}

const Header: FC<HeaderProps> = ({ categories }) => {
  const router = useRouter();
  const { visible } = useSelector((globalState: any) => globalState.cart);
  const [isMenuActive, setMenuActive] = useState(false);
  const [isCartActive, setCartActive] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const dispatch = useDispatch();

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [visible]);

  if (!hydrated) {
    return null;
  }

  return (
    <div className="relative z-10">
      <div className="base-wrapper !flex-row  gap-[60px] 2xl:justify-normal items-center justify-between md:z-[10] z-[100] h-[52px] my-[40px] ">
        <Image
          src={menu}
          alt=""
          className="w-[40px] cursor-pointer h-[40px] 2xl:hidden block"
          onClick={() => {
            setMenuActive(!isMenuActive);
          }}
        />
        <Image
          onClick={() => router.push("/")}
          src={logo}
          alt=""
          className="w-[133px] h-[40px] cursor-pointer"
        />
        <div className="2xl:hidden">
          <Cart active={visible} onClose={() => dispatch(toggleCart())} />
        </div>

        {/* mobile menu */}
        <div
          className={`flex 2xl:hidden flex-col fixed top-0 left-0 w-full min-h-screen  bg-white z-[100] transition-all  duration-300 ${
            isMenuActive ? "translate-y-0" : "translate-x-[120%]"
          }`}
        >
          <SimpleBar
            style={{
              height: "100vh",
            }}
          >
            <div className="base-wrapper flex flex-col">
              <div className="h-[52px] my-[40px] flex flex-row py-[24px] md:py-[32px] gap-[60px] items-center 2xl:justify-normal justify-between z-[10] ">
                <Image
                  src={close}
                  onClick={() => setMenuActive(false)}
                  alt=""
                  className="md:w-[40px] cursor-pointer w-[32px] h-[32px] md:h-[40px] 2xl:hidden block"
                />
                <Image src={logo} alt="" className="w-[133px] h-[40px]" />
                <Image
                  onClick={() => dispatch(toggleCart())}
                  onMouseEnter={() => setIsCartHovered(!isCartHovered)}
                  onMouseLeave={() => setIsCartHovered(!setCartActive)}
                  src={isCartHovered ? cartBlue : cart}
                  alt=""
                  className="w-[32px] h-[32px] 2xl:hidden block cursor-pointer"
                />
              </div>
              <div className="flex bg-[#F3F3F3] py-[19px] rounded-[10px] md:w-[35%] mt-[32px] md:mt-[52px] pr-[24px]">
                <img
                  src={SearchSrc.src}
                  alt=""
                  className="w-[24px] mx-[20px]"
                />
                <input
                  type="text"
                  placeholder="What courses are you looking for?"
                  className="bg-[#F3F3F3] border-none outline-none w-full body-1"
                />
              </div>
              <div className="flex flex-wrap gap-[12px] mt-[32px]">
                {categories?.map((category) => {
                  return (
                    <div
                      key={category?.id}
                      onClick={() =>
                        router.push(`/courses?category=${category?.id}`)
                      }
                      className="btn-secondary"
                      dangerouslySetInnerHTML={{ __html: category?.name }}
                    />
                  );
                })}
              </div>
              <div
                onClick={() => router.push("/calendar")}
                className="heading-1 border-b-[1px] border-[#E0E0E0] py-[24px] mt-[21px]"
              >
                Calender
              </div>
              <div
                onClick={() => router.push("/blog")}
                className="heading-1 border-b-[1px] border-[#E0E0E0] py-[24px] "
              >
                Blog
              </div>
              <div
                onClick={() => router.push("/about")}
                className="heading-1 border-b-[1px] border-[#E0E0E0] py-[24px] "
              >
                About
              </div>
              <div
                onClick={() => router.push("/faq")}
                className="heading-1 border-b-[1px] border-[#E0E0E0] py-[24px] "
              >
                FAQ
              </div>
              <div
                onClick={() => router.push("/contact")}
                className="heading-1 py-[24px] "
              >
                Contact
              </div>
            </div>
          </SimpleBar>
        </div>
        <div className="2xl:flex hidden items-center justify-between flex-1 w-full h-[52px]">
          <CoursesPopover categories={categories} />
          <div className="hidden 2xl:flex gap-[60px] items-center justify-center">
            <p onClick={() => router.push("/calendar")} className="text">
              Calendar
            </p>
            <p onClick={() => router.push("/blog")} className="text">
              Blog
            </p>
            <p onClick={() => router.push("/about")} className="text">
              About
            </p>
            <p onClick={() => router.push("/faq")} className="text">
              FAQ
            </p>
            <p onClick={() => router.push("/contact")} className="text">
              Contact
            </p>
          </div>
          <Cart active={visible} onClose={() => dispatch(toggleCart())} />
        </div>
      </div>
    </div>
  );
};

export default Header;
