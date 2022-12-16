"use client";
import { FC, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { StorageKeys } from "../common";
import { GlobalContext } from "../context/GlobalContext";

export const Navbar: FC = () => {
  const router = useRouter();
  const { [StorageKeys.CURRENT_USER]: user, logoutUser } =
    useContext(GlobalContext);

    useEffect(() => {
      !user && router.replace("/");
    }, [user, router]);

  return (
    <div className="navbar bg-primary">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          <Image
            src="/brandIcon.png"
            alt="Brand image"
            width={30}
            height={30}
            className="mr-2"
          />
          Hiretown
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0 bg-primary">
          {user ? (
            <li>
              <span>Profile</span>
              <ul className="p-2 bg-primary z-20">
                <li>
                  <Link
                    href="/profile"
                    className="btn btn-ghost normal-case text-base"
                  >
                    Details
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="btn btn-ghost normal-case text-base"
                    onClick={logoutUser}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          ) : (
            <label
              htmlFor="login-modal"
              className="btn btn-ghost normal-case text-base"
            >
              Login
            </label>
          )}
          <li tabIndex={0}>
            <a>
              EN
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2 bg-primary z-20">
              <li>
                <a>FR</a>
              </li>
              <li>
                <a>DE</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};
