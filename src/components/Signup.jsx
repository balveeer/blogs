import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setLoad(true);
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        authService.emailverification();
        navigate("/verify-email");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center m-3">
      <div
        className={`mx-auto w-full max-w-lg bg-teal-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Create a new account
        </h2>
        <p className="mt-2 w-full text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline hover:text-blue-700"
          >
            Login
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your Full Name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  pattern: (value) =>
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
                      value
                    ) || "Enter a Valid Email address.",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              type="submit"
              className="w-full rounded-lg hover:bg-blue-700"
            >
              {load ? (
                <span className="animate-[spin_1.5s_ease-in-out_infinite] overflow-hidden text-white inline-block">
                  <svg
                    className="animate-spin"
                    width="20"
                    stroke="white"
                    fill="white"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z" />
                  </svg>
                </span>
              ) : (
                <span>Create Account</span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
