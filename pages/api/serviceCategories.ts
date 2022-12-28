import type { APIResponse, ServiceCategory } from "../../common";
import { BASE_API_URL, Cors, runMiddleware } from "../../common/utils";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = APIResponse<ServiceCategory> | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runMiddleware(req, res, Cors);

  const url = new URL(`${BASE_API_URL}/serviceCategories/records`);
  url.searchParams.set("page", "1");
  url.searchParams.set("perPage", "20");
  url.searchParams.set("sort", "name");

  // TODO: use pockebase npm library
  const response = await fetch(url);

  if (response.ok) {
    const data: Data = await response.json();
    res.status(200).json(data);
  } else {
    res.status(500).json({ error: "Failed to load service categories data" });
  }
}
