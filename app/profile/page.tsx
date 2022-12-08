"use client";

import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { BASE_URL } from "../../common/utils";

const getProfile = async (searchTerm: string) => {
  console.log(searchTerm);
  const url = new URL(`${BASE_URL}/businesses/records`);
  url.searchParams.set("page", "1");
  url.searchParams.set("perPage", "20");
  url.searchParams.set("sort", "name");
  // TODO: use pockebase npm library

  const response = await fetch(url);
  const data = await response.json();

  return data?.items;
};

const Profile: NextPage = () => {
  return (
    <section>
      <div className="m-2 sm:m-5 flex gap-x-3">
        <div className="avatar placeholder online">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
            {/* <span className="text-3xl">K</span> */}
            <Image
              loader={({ src }) => src}
              src="https://placeimg.com/192/192/people"
              alt="Avatar image"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="self-center">
          <h3 className="text-2xl">User Name</h3>
          <p className="text-base">user@email.com</p>
        </div>
      </div>
      <div className="drawer drawer-mobile h-full">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content divide-y divide-y-reverse">
            <li className="mt-2 text-base-300 border-y-0">Activity</li>
            <li>
              <a>My Searches</a>
            </li>
            <li>
              <a>My Messages</a>
            </li>
            <li>
              <a>My Hires</a>
            </li>
            <li>
              <a>My Businesses</a>
            </li>
            <li className="mt-8 text-base-300">Settings</li>
            <li>
              <a>Profile Overview</a>
            </li>
            <li>
              <a>Payment Methods</a>
            </li>
            <li>
              <a>Notifications</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Profile;
