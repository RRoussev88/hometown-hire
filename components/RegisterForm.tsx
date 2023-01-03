"use client";
import clsx from "clsx";
import { FC, useContext, useEffect, useState } from "react";
import {
  BASE_API_URL,
  emailValidator,
  passwordValidator,
  User,
} from "../common";
import { GlobalContext } from "../context/GlobalContext";
import { useValidatedInput } from "../hooks";
import { ModalDialog } from "./ModalDialog";

export const RegisterForm: FC = () => {
  const { loginUser } = useContext(GlobalContext);

  const [email, setEmail, isEmailValid] = useValidatedInput(emailValidator);
  const [password, setPassword, isPasswordValid] =
    useValidatedInput(passwordValidator);
  const [passwordConfirm, setPasswordConfirm, isConfirmPassValid] =
    useValidatedInput((confirmPass) => confirmPass === password);

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [isLoginTried, setIsLoginTried] = useState(false);

  const handleRegister = async () => {
    setIsLoginTried(true);
    setError("");
    if (!isEmailValid || !isPasswordValid || !isConfirmPassValid) return;

    const signUpResponse = await fetch(`${BASE_API_URL}/signup`, {
      method: "POST",
      body: JSON.stringify({ email, password, passwordConfirm }),
    });

    if (signUpResponse.ok) {
      const signInResponse = await fetch(`${BASE_API_URL}/signin`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (signInResponse.ok) {
        const data: { record: User; token: string } =
          await signInResponse.json();
        loginUser(data.record, data.token);
        setIsOpen(false);
      } else {
        const data: { error: string } = await signInResponse.json();
        setError(data.error);
      }
    } else {
      const data: { error: string } = await signUpResponse.json();
      setError(data.error);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      setError("");
      setIsLoginTried(false);
    }
  }, [isOpen, setEmail, setPassword, setPasswordConfirm]);

  return (
    <ModalDialog
      modalId="register-modal"
      isModalOpen={isOpen}
      onToggle={() => setIsOpen((prevState) => !prevState)}
    >
      <form className="flex flex-col items-center">
        <div className="form-control w-full">
          <input
            required
            aria-required
            type="email"
            placeholder="Email"
            className={clsx(
              "input input-bordered w-full mb-4",
              !!error && "input-error",
              isLoginTried && !isEmailValid && "input-error"
            )}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {isLoginTried && !isEmailValid && (
            <label className="label label-text-alt text-error">
              Please enter valid email address
            </label>
          )}
        </div>
        <div className="form-control w-full">
          <input
            required
            aria-required
            type="password"
            placeholder="Password"
            className={clsx(
              "input input-bordered w-full mb-4",
              !!error && "input-error",
              isLoginTried && !isPasswordValid && "input-error"
            )}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {isLoginTried && !isPasswordValid && (
            <label className="label label-text-alt text-error">
              Please enter a password at least 6 characters long
            </label>
          )}
        </div>
        <div className="form-control w-full">
          <input
            required
            aria-required
            type="password"
            placeholder="Confirm Password"
            className={clsx(
              "input input-bordered w-full mb-4",
              !!error && "input-error",
              isLoginTried &&
                isPasswordValid &&
                !isConfirmPassValid &&
                "input-error"
            )}
            value={passwordConfirm}
            onChange={(event) => setPasswordConfirm(event.target.value)}
          />
          {isLoginTried && isPasswordValid && !isConfirmPassValid && (
            <label className="label label-text-alt text-error">
              Password and confirm password values don&apos;t match
            </label>
          )}
        </div>
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
