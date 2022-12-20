"use client";
import { FC, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { StorageKeys } from "../common";
import { GlobalContext } from "../context/GlobalContext";
import { DownChevron, HamburgerIcon } from "./SvgIcons";

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
          )}
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
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              htmlFor="navbar-drawer"
              className="btn btn-square btn-outline drawer-button mr-auto lg:hidden"
            >
              <HamburgerIcon />
            </label>
            <ul
              tabIndex={1}
              className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4 gap-2"
            >
              {user ? (
                <li
                  tabIndex={2}
                  className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
                >
                  <div className="collapse-title font-medium">Profile</div>
                  <div className="collapse-content w-full">
                    <ul className="w-full">
                      <li>
                        <a href="/profile" className="w-full">
                          Details
                        </a>
                      </li>
                      <li>
                        <a href="/" onClick={logoutUser} className="w-full">
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : (
                <li>
                  <label
                    htmlFor="login-modal"
                    className="btn btn-ghost normal-case text-base w-full"
                  >
                    Login
                  </label>
                </li>
              )}
              <li
                tabIndex={3}
                className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
              >
                <div className="collapse-title font-medium">EN</div>
                <div className="collapse-content w-full">
                  <ul className="w-full">
                    <li>
                      <a className="w-full">FR</a>
                    </li>
                    <li>
                      <a className="w-full">DE</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  );
};
