export const BASE_URL = "http://127.0.0.1:8090/api/collections";
export const FILE_URL = "http://127.0.0.1:8090/api/files";

export const StorageKeys = {
  ACCESS_TOKEN: "accessToken",
  CURRENT_USER: "currentUser",
  COLOR_THEME: "colorTheme",
  SELECTED_LOCALE: "selectedLocale",
} as const;

export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const emailValidator = (value: string) =>
  !!value.trim().toLowerCase().match(EMAIL_REGEX)?.length;

export const passwordValidator = (pass: string) => pass.length >= 6;
