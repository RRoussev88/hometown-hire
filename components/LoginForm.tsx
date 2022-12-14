"use client";
import clsx from "clsx";
import Link from "next/link";
import { FC, useContext, useEffect, useState } from "react";
import { BASE_URL, StorageKeys, User } from "../common";
import { GlobalContext } from "../context/GlobalContext";
import { ModalDialog } from "./ModalDialog";

export const LoginForm: FC = () => {
  const { loginUser } = useContext(GlobalContext);

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const response = await fetch(`${BASE_URL}/users/auth-with-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identity: email, password }),
    });

    if (response.ok) {
      setError("");
      const data: { record: User; token: string } = await response.json();
      loginUser(data.record, data.token);
      setIsOpen(false);
    } else {
      setError(response.statusText);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setError("");
    }
  }, [isOpen]);

  return (
    <ModalDialog
      modalId="login-modal"
      isModalOpen={isOpen}
      onToggle={() => setIsOpen((prevState) => !prevState)}
    >
      <form className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Email"
          className={clsx(
            "input input-bordered w-full mb-5",
            !!error && "input-error"
          )}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={clsx(
            "input input-bordered w-full mb-5",
            !!error && "input-error"
          )}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {!!error && <p className="badge badge-error mb-5">{error}</p>}
        <button
          type="button"
          className="btn btn-primary w-full mb-3"
          onClick={handleLogin}
        >
          Login
        </button>
        <Link className="link link-primary" href="/register">
          No account yet? Click here to register
        </Link>
      </form>
    </ModalDialog>
  );
};
