"use client";
import clsx from "clsx";
import React, { FC, useRef, useState } from "react";
import { useIsVisible } from "../common";

export type ContentComponentType = { isOpen: boolean; onClose: () => void };

type ModalDialogType = { toggleId: string; Content: FC<ContentComponentType> };

export const ModalDialog: FC<ModalDialogType> = ({ Content, toggleId }) => {
  const ref = useRef<HTMLLabelElement | null>(null);
  const isCloseBtnVisible = useIsVisible(ref);

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (event: any) => {
    event.stopPropagation();
    setIsOpen((prevState) => !prevState);
  };

  const onBackdropClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) =>
    // Only close modal is the backdrop is clicked
    // and if the close button is not present
    (event.target as EventTarget & { id?: string }).id == "modal-backdrop" &&
    !isCloseBtnVisible &&
    toggleOpen(event);

  return (
    <>
      <input
        type="checkbox"
        id={toggleId}
        className="modal-toggle"
        checked={isOpen}
        onChange={toggleOpen}
      />
      <div
        id="modal-backdrop"
        onClickCapture={onBackdropClick}
        className={clsx(
          "modal modal-bottom sm:modal-middle",
          isOpen && "modal-open"
        )}
      >
        <div className="modal-box relative sm:pt-12">
          <label
            ref={ref}
            htmlFor={toggleId}
            className="hidden sm:inline-flex btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <Content isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
      </div>
    </>
  );
};
