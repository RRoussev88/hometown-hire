"use client";
import clsx from "clsx";
import { FC, useContext, useEffect, useState } from "react";
import { BASE_URL, emailValidator, passwordValidator, User } from "../common";
import { GlobalContext } from "../context/GlobalContext";
import { useValidatedInput } from "../hooks";
import { ModalDialog } from "./ModalDialog";

export const LoginForm: FC = () => {
  const { loginUser } = useContext(GlobalContext);

  const [email, setEmail, isEmailValid] = useValidatedInput(emailValidator);
  const [password, setPassword, isPasswordValid] =
    useValidatedInput(passwordValidator);

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [isLoginDisabled, setIsLoginDisabled] = useState(
    () => !isEmailValid || !isPasswordValid
  );

  const handleLogin = async () => {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data: { record: User; token: string } = await response.json();
      setError("");
      loginUser(data.record, data.token);
      setIsOpen(false);
    } else {
      const data: { error: string } = await response.json();
      setError(data.error);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setError("");
    }
  }, [isOpen, setEmail, setPassword]);

  useEffect(() => {
    // TODO: Validate after submit button click
    setIsLoginDisabled(!isEmailValid || !isPasswordValid);
  }, [isEmailValid, isPasswordValid]);

  return (
    <ModalDialog
      modalId="login-modal"
      isModalOpen={isOpen}
      onToggle={() => setIsOpen((prevState) => !prevState)}
    >
      <form className="flex flex-col items-center">
        <input
          required
          aria-required
          type="email"
          placeholder="Email"
          className={clsx(
            "input input-bordered w-full mb-4",
            !!error && "input-error"
          )}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          required
          aria-required
          type="password"
          placeholder="Password"
          className={clsx(
            "input input-bordered w-full mb-4",
            !!error && "input-error"
          )}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {!!error && <p className="badge badge-error mb-4">{error}</p>}
        <button
          disabled={isLoginDisabled}
          type="button"
          className="btn btn-primary w-full mb-4"
          onClick={handleLogin}
        >
          Sign in
        </button>
        <label
          className="link link-primary"
          htmlFor="register-modal"
          onClick={() => setIsOpen(false)}
        >
          No account yet? Click here to Sign up
        </label>
      </form>
    </ModalDialog>
  );
};
