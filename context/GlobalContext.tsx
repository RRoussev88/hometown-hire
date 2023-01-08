"use client";
import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { StorageKeys, User } from "../common";

export type GlobalStateType = {
  [StorageKeys.ACCESS_TOKEN]: string;
  [StorageKeys.CURRENT_USER]: User | null;
  [StorageKeys.COLOR_THEME]: string;
  [StorageKeys.SELECTED_LOCALE]: string;
  logoutUser: () => void;
  loginUser: (currentUser: User, accessToken: string) => void;
};

const getUserData = (): User | null => {
  const data = localStorage?.getItem(StorageKeys.CURRENT_USER);
  let user: User | null = null;
  if (data) {
    try {
      user = JSON.parse(data);
    } catch (error) {
      console.error("Error parsing current user data", error);
    }
  }
  return user;
};

const globalState: GlobalStateType = {
  [StorageKeys.ACCESS_TOKEN]: "",
  [StorageKeys.CURRENT_USER]: null,
  [StorageKeys.COLOR_THEME]: "bumblebee",
  [StorageKeys.SELECTED_LOCALE]: "EN",
  logoutUser: () => {},
  loginUser: () => {},
};

export const GlobalContext = createContext<GlobalStateType>(globalState);

export const GlobalProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const [state, setState] = useState<GlobalStateType>(globalState);

  useEffect(() => {
    setState({
      ...globalState,
      [StorageKeys.CURRENT_USER]: getUserData(),
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        logoutUser() {
          router.replace("/");
          setState((prevState) => ({
            ...prevState,
            accessToken: "",
            currentUser: null,
          }));
          localStorage?.removeItem(StorageKeys.ACCESS_TOKEN);
          localStorage?.removeItem(StorageKeys.CURRENT_USER);
        },
        loginUser(currentUser, accessToken) {
          setState((prevState) => ({
            ...prevState,
            accessToken,
            currentUser,
          }));
          localStorage?.setItem(StorageKeys.ACCESS_TOKEN, accessToken);
          localStorage?.setItem(
            StorageKeys.CURRENT_USER,
            JSON.stringify(currentUser)
          );
          router.push("/profile");
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
