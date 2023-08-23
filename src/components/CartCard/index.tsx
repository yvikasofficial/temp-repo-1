import { FC } from "react";
import close from "../../images/close.svg";
import Image from "next/image";
import { ProductType } from "@/interfaces";
import { getUSDFormat } from "@/utils/cartHelper";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "@/store/cart-reducer";

import VoucherSrc from "@/images/VoucherImage.png";

interface CartCardProps {
  className?: any;
  data: ProductType;
  count?: any;
  isCheckout?: boolean;
}

const CartCard: FC<CartCardProps> = ({
  className,
  data,
  count,
  isCheckout,
}) => {
  const dispatch = useDispatch();
  const isVoucher = data?.categories?.find(
    (category) => category?.slug === "voucher"
  );

  return (
    <div className={`${className} w-full`}>
      <div className="px-[24px] py-[16px] bg-[#F5F5F5] rounded-[10px] flex items-center justify-between gap-[48px] w-full">
        <div className="flex gap-[16px] items-center justify-between w-full">
          {isVoucher ? (
            <Image
              src={VoucherSrc}
              width={62}
              height={62}
              alt=""
              className="w-[94px] h-[94px] bg-slate-200"
            />
          ) : (
            <Image
              src={data?.image}
              width={62}
              height={62}
              alt=""
              className="w-[94px] h-[94px] bg-slate-200"
            />
          )}
          <div className="flex-1 flex items-center justify-between gap-[16px] w-full">
            <div className="flex flex-col gap-[8px] ">
              <div className={`cart ${isCheckout ? "md:!text-[16px]" : ""}`}>
                {data?.name}
              </div>
              {isCheckout ? null : (
                <>
                  {isVoucher ? (
                    <div className="label">voucher</div>
                  ) : (
                    <div className="label">{data?.duration} course</div>
                  )}
                </>
              )}

              <div className="text-[20px] font-[590] mt-[4px]">
                {getUSDFormat(parseInt(data?.price, 10) * count)}
              </div>
            </div>
            <Image
              onClick={() =>
                dispatch(removeItemFromCart({ ...data, trigger: true }))
              }
              className="w-[16px] h-[16px] cursor-pointer"
              alt=""
              src={close}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
