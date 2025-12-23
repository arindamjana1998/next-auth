"use client";

import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const SignInSignUp = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--navy-dark)] font-sans">
      <div className="relative h-[500px] w-[90%] max-w-md md:w-full md:max-w-[800px] overflow-hidden rounded-[20px] bg-white shadow-[0_14px_28px_-10px_rgba(0,0,0,0.1),0_10px_10px_-10px_rgba(0,0,0,0.02)] [perspective:1500px] transition-all duration-300">
        {/* LOGIN FORM (Always on Left) */}
        <div
          className={`absolute left-0 top-0 h-full w-full md:w-1/2 flex-col items-center justify-center bg-[#FAFAFA] px-12 text-center transition-all duration-300 ${
            isRegister ? "hidden md:flex" : "flex"
          }`}
        >
          <h1 className="mb-4 text-4xl font-bold">Log In</h1>
          <SignInForm />

          {/* Mobile Only - Switch to Register */}
          <div className="mt-4 md:hidden">
            <p className="text-sm text-[#333]">Don't have an account?</p>
            <button
              onClick={() => setIsRegister(true)}
              className="mt-2 text-sm font-bold text-[#ff4b2b] hover:underline "
            >
              Sign Up
            </button>
          </div>

          <span className="absolute bottom-4 text-sm text-[#333]">
            &copy; {new Date().getFullYear()} Ting Tong Inc.
          </span>
        </div>

        {/* REGISTER FORM (Always on Right) */}
        <div
          className={`absolute left-0 md:left-auto md:right-0 top-0 h-full w-full md:w-1/2 flex-col items-center justify-center bg-[#FAFAFA] px-12 text-center transition-all duration-300 ${
            !isRegister ? "hidden md:flex" : "flex"
          }`}
        >
          <h1 className="mb-4 text-4xl font-bold">Sign Up</h1>

          {/* Mobile Only - Switch to Login */}
          <div className="mb-4 md:hidden">
            <p className="text-sm text-[#333]">Already have an account?</p>
            <button
              onClick={() => setIsRegister(false)}
              className="mt-1 text-sm font-bold text-[#ff4b2b] hover:underline "
            >
              Sign In
            </button>
          </div>
          <SignUpForm />
        </div>

        {/* FLIP PAGE (Overlay) */}
        <div
          className={`hidden md:block absolute right-0 top-0 h-full w-1/2 origin-left transition-transform duration-1000 ease-in-out [transform-style:preserve-3d] ${
            isRegister ? "[transform:rotateY(-180deg)]" : ""
          }`}
        >
          {/* FRONT FACE (Visible initially) -> Shows on Right */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gradient-to-br from-[#FFCF00] to-[#FC4F4F] px-10 text-center text-white [backface-visibility:hidden]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="96"
              height="96"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-4"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
            <h1 className="mb-4 text-4xl font-bold">Hello, friend!</h1>
            <p className="mb-8 text-base">
              Enter your personal details and start journey with us
            </p>
            <button
              onClick={() => setIsRegister(true)}
              className="flex items-center rounded-[40px] border border-white bg-transparent px-12 py-3 text-xs font-bold uppercase tracking-wider text-white transition-transform duration-80 hover:bg-white hover:text-[#ff4b2b] active:scale-95 focus:outline-none "
            >
              Register
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 16 16 12 12 8" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </button>
          </div>

          {/* BACK FACE (Hidden initially) -> Shows on Left when rotated */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gradient-to-br from-[#FC4F4F] to-[#FFCF00] px-10 text-center text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="96"
              height="96"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-4"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            <h1 className="mb-4 text-4xl font-bold">Welcome Back!</h1>
            <p className="mb-8 text-base">
              To keep connected with us please login with your personal info
            </p>
            <button
              onClick={() => setIsRegister(false)}
              className="flex items-center rounded-[40px] border border-white bg-transparent px-12 py-3 text-xs font-bold uppercase tracking-wider text-white transition-transform duration-80 hover:bg-white hover:text-[#ff4b2b] active:scale-95 focus:outline-none "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 8 8 12 12 16" />
                <line x1="16" y1="12" x2="8" y2="12" />
              </svg>
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
