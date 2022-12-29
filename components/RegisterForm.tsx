"use client";
import clsx from "clsx";
import { FC, useContext, useEffect, useState } from "react";
import {
  BASE_URL,
  emailValidator,
  passwordValidator,
  User,
  useValidatedInput,
} from "../common";
import { GlobalContext } from "../context/GlobalContext";
import { ModalDialog } from "./ModalDialog";

export const RegisterForm: FC = () => {
  const { loginUser } = useContext(GlobalContext);

  const [email, setEmail, isEmailValid] = useValidatedInput(emailValidator);
  const [password, setPassword, isPasswordValid] =
    useValidatedInput(passwordValidator);
  const [passwordConfirm, setPasswordConfirm, isConfirmPassValid] =
    useValidatedInput((confirmPass) => confirmPass === password);

  const [isSignUpDisabled, setIsSignUpDisabled] = useState(
    () => !isEmailValid || !isPasswordValid || !isConfirmPassValid
  );
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (password !== passwordConfirm) {
      setError("Password and confirm password values don't match");
      return;
    }

    const signUpResponse = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      body: JSON.stringify({ email, password, passwordConfirm }),
    });

    if (signUpResponse.ok) {
      setError("");
      const signInResponse = await fetch(`${BASE_URL}/signin`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (signInResponse.ok) {
        setError("");
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
    }
  }, [isOpen, setEmail, setPassword, setPasswordConfirm]);

  useEffect(() => {
    // TODO: Validate after submit button click
    setIsSignUpDisabled(!isEmailValid || !isPasswordValid || !isConfirmPassValid);
  }, [isEmailValid, isPasswordValid, isConfirmPassValid]);

  return (
    <ModalDialog
      modalId="register-modal"
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
        <input
          required
          aria-required
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
          disabled={isSignUpDisabled}
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
