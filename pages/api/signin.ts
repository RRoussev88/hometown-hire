import type { NextApiRequest, NextApiResponse } from "next";
import type { RecordAuthResponse } from "pocketbase";
import PocketBase from "pocketbase";

import type { User } from "../../common";
import {
  BACKEND_URL,
  Cors,
  isClientResponseError,
  runMiddleware,
} from "../../common/utils";

type SigninResponse = RecordAuthResponse<User> | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SigninResponse>
) {
  await runMiddleware(req, res, Cors);

  const { email, password } = JSON.parse(req.body);
  if (!email || !password) {
    res.status(400).json({ error: "Valid credentials are required" });
  }

  const pb = new PocketBase(BACKEND_URL);
  const err = "Signin failed";
  try {
    const data: RecordAuthResponse<User> = await pb
      .collection("users")
      .authWithPassword(email, password);

    res.status(200).json(data);
  } catch (error) {
    if (isClientResponseError(error)) {
      res.status(error.status).json({ error: error.data.message ?? err });
    } else {
      res.status(500).json({ error: err });
    }
  }
}
