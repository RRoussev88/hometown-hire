import type { User } from "../../common";
import { BASE_API_URL, Cors, runMiddleware } from "../../common/utils";
import type { NextApiRequest, NextApiResponse } from "next";

type SigninResponse = { record: User; token: string } | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SigninResponse>
) {
  await runMiddleware(req, res, Cors);

  const { email, password } = JSON.parse(req.body);
  const err = { error: "Signin failed" };
  if (!email || !password) {
    res.status(500).json(err);
  }
  
  // TODO: use pockebase npm library
  const response = await fetch(`${BASE_API_URL}/users/auth-with-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identity: email, password }),
  });

  if (response.ok) {
    const data: SigninResponse = await response.json();
    res.status(200).json(data);
  } else {
    res.status(500).json(err);
  }
}
