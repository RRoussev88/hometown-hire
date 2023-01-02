"use client";
import clsx from "clsx";
import React, { FC, PropsWithChildren, useRef } from "react";
import { useIsVisible } from "../hooks";

type ModalDialogType = {
  isModalOpen: boolean;
  modalId: string;
  onToggle: () => void;
};

export const ModalDialog: FC<PropsWithChildren<ModalDialogType>> = ({
  children,
  isModalOpen,
  modalId,
  onToggle,
}) => {
  const ref = useRef<HTMLLabelElement | null>(null);
  const isCloseBtnVisible = useIsVisible(ref);

  const toggleOpen = (event: any) => {
    event.stopPropagation();
    onToggle();
  };

  const onBackdropClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) =>
    // Only close modal if the backdrop is clicked
    // and if the close button is not present
    (event.target as EventTarget & { id?: string }).id == "modal-backdrop" &&
    !isCloseBtnVisible &&
    toggleOpen(event);

  return (
    <>
      <input
        type="checkbox"
        id={modalId}
        className="modal-toggle"
        checked={isModalOpen}
        onChange={toggleOpen}
      />
      <div
        id="modal-backdrop"
        onClickCapture={onBackdropClick}
        className={clsx(
          "modal modal-bottom sm:modal-middle",
          isModalOpen && "modal-open"
        )}
      >
        <div className="modal-box relative sm:pt-12">
          <label
            ref={ref}
            htmlFor={modalId}
            className="hidden sm:inline-flex btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          {children}
        </div>
      </div>
    </>
  );
};
