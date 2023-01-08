import cors from "cors";
import type { ClientResponseError } from "pocketbase";
import type { NextApiRequest, NextApiResponse } from "next";
import type { APIResponse } from "./types";

export const Cors = cors({ methods: ["POST", "GET", "HEAD", "PUT", "PATCH"] });

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });

export const BASE_API_URL = "http://127.0.0.1:3000/api";
export const BACKEND_URL = "http://127.0.0.1:8090";
export const FILES_URL = `${BACKEND_URL}/api/files`;

export const StorageKeys = {
  ACCESS_TOKEN: "accessToken",
  CURRENT_USER: "currentUser",
  COLOR_THEME: "colorTheme",
  SELECTED_LOCALE: "selectedLocale",
} as const;

export const SeverityLevel = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
} as const;

export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const emailValidator = (value: string) =>
  !!value.trim().toLowerCase().match(EMAIL_REGEX)?.length;

export const passwordValidator = (pass: string) => pass.length >= 6;

export const isApiResponse = <T>(res: unknown): res is APIResponse<T> =>
  !Number.isNaN((res as APIResponse).page) &&
  !Number.isNaN((res as APIResponse).totalItems) &&
  Array.isArray((res as APIResponse).items);

export const isClientResponseError = (
  error: unknown
): error is ClientResponseError =>
  !Number.isNaN((error as ClientResponseError).status) &&
  (error as ClientResponseError).status >= 400 &&
  typeof (error as ClientResponseError).url === "string" &&
  typeof (error as ClientResponseError).data === "object" &&
  typeof (error as ClientResponseError).isAbort === "boolean" &&
  "originalError" in (error as ClientResponseError);

export class APIError {
  isSystemError = true;
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
