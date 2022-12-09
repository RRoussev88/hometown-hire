import { FC } from "react";
import Link from "next/link";

export const LoginForm: FC = () => (
  <form className="flex flex-col items-center">
    <input
      type="text"
      placeholder="Email"
      className="input input-bordered input-error w-full mb-5"
    />
    <input
      type="password"
      placeholder="Password"
      className={`input input-bordered input-error w-full mb-5`}
    />
    <button type="button" className="btn btn-primary w-full mb-3">
      Login
    </button>
    <Link className="link link-primary" href="/register">
      No account yet? Click here to register
    </Link>
  </form>
);
