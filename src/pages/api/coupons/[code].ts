import api from "@/config/apiConfig";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method, body } = req;
  const { code } = req.query;

  switch (method) {
    case "GET":
      try {
        const data = await api.get(`coupons`, {
          code,
        });
        res.status(200).json(data?.data);
      } catch (error: any) {
        res.status(400).json(error?.data);
      }
      break;

    case "PUT":
      try {
        const data = await api.put(`coupons`, {
          code,
        });
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
