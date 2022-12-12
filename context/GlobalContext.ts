"use client";
import { createContext } from "react";

export const globalState = { isModalOpen: false };

export const GlobalContext = createContext(globalState);
