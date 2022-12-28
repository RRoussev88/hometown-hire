import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import type { Business } from "../common";
import { FILE_API_URL } from "../common/utils";
import { RatingDisplay } from "./RatingDisplay";

export const BusinessCard: FC<{ business: Business }> = ({ business }) => (
  <div className="card card-compact sm:card-side bg-base-100 shadow-xl sm:max-h-52">
    <figure className="min-w-fit sm:h-52">
      <Image
        src={
          business.thumbnail
            ? `${FILE_API_URL}/${business.collectionId}/${business.id}/${business.thumbnail}?thumb=200x200`
            : "https://placeimg.com/400/400/arch"
        }
        alt="Business logo"
        width={200}
        height={200}
      />
    </figure>
    <div className="card-body w-80">
      <div className="flex justify-between">
        <h2 className="card-title w-48 text-ellipsis overflow-hidden">
          {business.name}
        </h2>
        <RatingDisplay name={business.id.toString()} value={business.rating} />
      </div>
      <p className="text-xs text-base-300">
        {business.areas.map((area, index, arr) => (
          <span key={area} className={clsx({ "mr-2": index < arr.length - 1 })}>
            {area}
            {clsx({ ",": index < arr.length - 1 })}
          </span>
        ))}
      </p>
      <div className="mb-3">
        <p className="text-xs text-base-content line-clamp-5">
          {business.description}
        </p>
      </div>
    </div>
    <Link
      href={`/details/${business.id}`}
      className="absolute h-full w-full rounded-xl"
    />
  </div>
);
