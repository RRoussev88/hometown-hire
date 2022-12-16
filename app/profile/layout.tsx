import { ReactNode } from "react";
import { NextPage } from "next";
import { ProfileHeader } from "./(profileHeader)";

const Profile: NextPage<{ children: ReactNode }> = ({ children }) => (
  <section>
    <ProfileHeader />
    <div className="drawer drawer-mobile h-full">
      <input id="left-side-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="left-side-drawer" className="drawer-overlay"></label>
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

export default Profile;
