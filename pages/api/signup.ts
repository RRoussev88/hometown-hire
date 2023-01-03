import type { NextApiRequest, NextApiResponse } from "next";
import PocketBase from "pocketbase";

import type { User } from "../../common";
import {
  BACKEND_URL,
  Cors,
  isClientResponseError,
  runMiddleware,
} from "../../common/utils";

type SignupResponse = User | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignupResponse>
) {
  await runMiddleware(req, res, Cors);

  const { email, password, passwordConfirm } = JSON.parse(req.body);
  if (!email || !password || !passwordConfirm) {
    res.status(400).json({ error: "Valid credentials are required" });
  }

  const pb = new PocketBase(BACKEND_URL);
  const err = "Signup failed";
  try {
    const data: User = await pb
      .collection("users")
      .create({ email, password, passwordConfirm });

    res.status(200).json(data);
  } catch (error) {
    if (isClientResponseError(error)) {
      res.status(error.status).json({ error: error.data.message ?? err });
    } else {
      res.status(500).json({ error: err });
    }
  }
}
