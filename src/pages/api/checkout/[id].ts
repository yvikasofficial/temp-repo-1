import api from "@/config/apiConfig";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method, body } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const data = await api.get(`orders/${id}`, body);
        res.status(200).json(data?.data);
      } catch (error: any) {
        res.status(400).json(error?.data);
      }
      break;

    case "PUT":
      try {
        const products = body.line_items;
        const productsMap = {} as any;
        products?.forEach((product) => {
          productsMap[product?.product_id] = product?.quantity;
        });

        const productsRes = await api.get("products", {
          include: products?.map((el: any) => el?.product_id)?.join(","),
        });
        let totalPrice = 0;
        productsRes?.data?.forEach((item: any) => {
          totalPrice += parseInt(item?.price, 10) * productsMap[item?.id];
        });

        if (body?.coupon_lines) {
          const couponData = await api.get(`coupons`, {
            code: body?.coupon_lines,
          });
          const activeCoupon = couponData?.data?.[0];
          if (!activeCoupon) {
            res.status(400).json({
              code: "invalid_coupon_code",
            });
          }

          body.coupon_lines = [
            {
              code: activeCoupon?.code,
              amount: activeCoupon?.amount,
            },
          ];

          // if (activeCoupon?.discount_type === "fixed_cart") {
          // const afterDiscount =
          //   totalPrice - parseInt(activeCoupon?.amount, 10);
          // totalPrice = Math.max(afterDiscount, 0);
          // }
        } else if (body?.coupon_lines === null) {
          body.coupon_lines = [];
        }

        const data = await api.put(`orders/${id}`, body);
        res.status(201).json(data?.data);
      } catch (error: any) {
        res.status(400).json({
          code: body?.coupon_lines
            ? "invalid_coupon_code"
            : "something_went_wrong",
        });
      }
      break;

    default:
      break;
  }
}
