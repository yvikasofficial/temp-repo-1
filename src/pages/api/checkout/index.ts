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
        const data = await api.post("orders", body);
        res.status(201).json(data?.data);
      } catch (error: any) {
        res.status(400).json(error?.data);
      }

      break;

    default:
      break;
  }
}
