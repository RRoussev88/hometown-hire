"use client";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { BASE_URL, StorageKeys, User } from "../common";
import { ContentComponentType } from "./ModalDialog";

export const LoginForm: FC<ContentComponentType> = ({ isOpen, onClose }) => {
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
      localStorage.setItem(StorageKeys.ACCESS_TOKEN, data.token);
      localStorage.setItem(
        StorageKeys.CURRENT_USER,
        JSON.stringify(data.record)
      );
      onClose();
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
  );
};
