import type { NextApiRequest, NextApiResponse } from "next";
import PocketBase from "pocketbase";

import type { APIResponse, Business } from "../../common";
import {
  BACKEND_URL,
  Cors,
  isClientResponseError,
  runMiddleware,
} from "../../common/utils";

type Data = APIResponse<Business> | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runMiddleware(req, res, Cors);

  const pb = new PocketBase(BACKEND_URL);
  const err = "Failed to load businesses data";
  try {
    const data: APIResponse<Business> = await pb
      .collection("businesses")
      .getList(1, 20, {
        sort: "name",
        filter: req.query.serviceId
          ? `services ~ "${req.query.serviceId}"`
          : "",
      });

    res.status(200).json(data);
  } catch (error) {
    if (isClientResponseError(error)) {
      res.status(error.status).json({ error: error.data.message ?? err });
    } else {
      res.status(500).json({ error: err });
    }
  }
}
