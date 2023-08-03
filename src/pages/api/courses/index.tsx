import api from "@/config/apiConfig";
import { ProductType } from "@/interfaces";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductType[]>
) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      const data = await api.get("products", query);
      res.status(200).json(data?.data);
      break;

    default:
      break;
  }
}
