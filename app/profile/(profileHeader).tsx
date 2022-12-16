"use client";
import { FC, useContext } from "react";
import Image from "next/image";
import { FILE_URL, StorageKeys } from "../../common/utils";
import { GlobalContext } from "../../context/GlobalContext";

export const ProfileHeader: FC = () => {
  const { [StorageKeys.CURRENT_USER]: user } = useContext(GlobalContext);
  const avatarAbbr =
    user?.name.split(" ").reduce((acc, curr) => `${acc}${curr[0]}`, "") ?? "";

  return (
    <div className="m-2 sm:m-5 flex flex-row-reverse lg:flex-row gap-x-3">
      <div className="avatar placeholder online">
        <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
          {user?.avatar ? (
            <Image
              loader={({ src }) => src}
              src={`${FILE_URL}/${user.collectionId}/${user.id}/${user.avatar}?thumb=100x100`}
              alt="Avatar image"
              width={100}
              height={100}
            />
          ) : (
            <span className="text-3xl">{avatarAbbr}</span>
          )}
        </div>
      </div>
      <div className="self-center">
        <h3 className="text-2xl">{user?.name}</h3>
        <p className="text-base">{user?.email}</p>
      </div>
      <label
        htmlFor="left-side-drawer"
        className="btn btn-square btn-outline drawer-button mr-auto lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M1 2l24 0M1 12l24 0M1 22l24 0"
          />
        </svg>
      </label>
    </div>
  );
};
