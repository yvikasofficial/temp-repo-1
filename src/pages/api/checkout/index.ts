import api from "@/config/apiConfig";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method, body } = req;

  switch (method) {
    case "POST":
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

        const data = await api.post("orders", body);
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
