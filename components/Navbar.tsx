"use client";
import { FC, useContext } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { StorageKeys } from "../common";
import { GlobalContext } from "../context/GlobalContext";
import { DownChevron, HamburgerIcon } from "./SvgIcons";

export const Navbar: FC = () => {
  const path = usePathname();
  const { [StorageKeys.CURRENT_USER]: user, logoutUser } =
    useContext(GlobalContext);

  return (
    <div className="navbar bg-primary">
      <div className="navbar-start">
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
      <div className="navbar-end">
        <ul className="menu menu-horizontal p-0 bg-primary">
          {path !== '/profile' &&
            (user ? (
              <li className="max-lg:hidden">
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
              <li>
                <label
                  htmlFor="login-modal"
                  className="btn btn-ghost normal-case text-base max-lg:hidden"
                >
                  Login
                </label>
              </li>
            ))}
          <li className="max-lg:hidden">
            <a>
              EN
              <DownChevron />
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
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-square btn-outline mr-auto lg:hidden"
          >
            <HamburgerIcon />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu menu-compact p-2 shadow bg-base-200 rounded-box w-32"
          >
            {user ? (
              <li className="relative">
                <label className="font-medium justify-end">Profile</label>
                <ul className="absolute -left-full menu menu-compact p-2 shadow bg-base-200 rounded-box w-32">
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
              <li>
                <label
                  htmlFor="login-modal"
                  className="font-medium  justify-end"
                >
                  Login
                </label>
              </li>
            )}
            <li className="relative">
              <label className="font-medium justify-end">EN</label>
              <ul className="absolute -left-full menu menu-compact p-2 shadow bg-base-200 rounded-box w-32">
                <li>
                  <a className="font-medium justify-center">FR</a>
                </li>
                <li>
                  <a className="font-medium justify-center">DE</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
