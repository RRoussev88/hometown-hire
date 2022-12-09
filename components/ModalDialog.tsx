"use client";
import { FC, PropsWithChildren } from "react";

export const ModalDialog: FC<PropsWithChildren> = ({ children }) => (
  <>
    <input type="checkbox" id="login-modal" className="modal-toggle" />
    <label htmlFor="login-modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box relative sm:pt-12">
        <label
          htmlFor="login-modal"
          className="hidden sm:inline-flex btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
        {children}
      </div>
    </label>
  </>
);
