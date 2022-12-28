import type { User } from "../../common";
import { BASE_API_URL, Cors, runMiddleware } from "../../common/utils";
import type { NextApiRequest, NextApiResponse } from "next";

type SignupResponse = User | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignupResponse>
) {
  await runMiddleware(req, res, Cors);

  const { email, password, passwordConfirm } = JSON.parse(req.body);
  const err = { error: "Signup failed" };
  if (!email || !password || !passwordConfirm) {
    res.status(500).json(err);
  }

  // TODO: use pockebase npm library
  const response = await fetch(`${BASE_API_URL}/users/records`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, passwordConfirm }),
  });

  if (response.ok) {
    const data: SignupResponse = await response.json();
    res.status(200).json(data);
  } else {
    res.status(500).json(err);
  }
}
