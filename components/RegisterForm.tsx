"use client";
import clsx from "clsx";
import { FC, useContext, useEffect, useState } from "react";
import { BASE_URL, User } from "../common";
import { GlobalContext } from "../context/GlobalContext";
import { ModalDialog } from "./ModalDialog";

export const RegisterForm: FC = () => {
  const { loginUser } = useContext(GlobalContext);

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (password !== passwordConfirm) {
      setError("Password and confirm password values don't match");
      return;
    }

    const signUpResponse = await fetch(`${BASE_URL}/users/records`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, passwordConfirm }),
    });

    if (signUpResponse.ok) {
      setError("");
      const signInResponse = await fetch(
        `${BASE_URL}/users/auth-with-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identity: email, password }),
        }
      );

      if (signInResponse.ok) {
        setError("");
        const data: { record: User; token: string } =
          await signInResponse.json();
        loginUser(data.record, data.token);
        setIsOpen(false);
      } else {
        setError(signInResponse.statusText);
      }
    } else {
      setError(signUpResponse.statusText);
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
      modalId="register-modal"
      isModalOpen={isOpen}
      onToggle={() => setIsOpen((prevState) => !prevState)}
    >
      <form className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Email"
          className={clsx(
            "input input-bordered w-full mb-4",
            !!error && "input-error"
          )}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={clsx(
            "input input-bordered w-full mb-4",
            !!error && "input-error"
          )}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className={clsx(
            "input input-bordered w-full mb-4",
            !!error && "input-error"
          )}
          value={passwordConfirm}
          onChange={(event) => setPasswordConfirm(event.target.value)}
        />
        {!!error && (
          <p className="badge badge-error h-auto p-4 mb-4">{error}</p>
        )}
        <button
          type="button"
          className="btn btn-primary w-full mb-4"
          onClick={handleRegister}
        >
          Sign up
        </button>
        <label
          className="link link-primary"
          htmlFor="login-modal"
          onClick={() => setIsOpen(false)}
        >
          Already have an account? Click here to Sign in.
        </label>
      </form>
    </ModalDialog>
  );
};
