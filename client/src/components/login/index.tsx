"use client";

import { AUTH_SERVICE_API } from "@/services/api/provider";
import { setCookie } from "@/utils/client/ cookie";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

interface Login {
  email: string;
  password: string;
}

export default function Login() {
  const dataRef = useRef<Login>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = () => {
    const data = dataRef.current;

    if (!data || !data.email || !data.password) {
      return;
    }

    AUTH_SERVICE_API.post("/auth/login", data).then((res) => {
      setCookie("authorization", res.data.accessToken);
      router.push("/");
    });
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white border border-gray-200 rounded-md shadow-lg">
        <div className="flex justify-center mb-4">
          <img src="/logos/lona2.png" alt="Instagram" className="h-[100px]" />
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Phone number, username, or email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                required
                onChange={(e) => {
                  dataRef.current.email = e.target.value;
                }}
                className="relative block w-full px-3 py-2 border border-gray-300 rounded-t-md placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Phone number, username, or email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                onChange={(e) => {
                  dataRef.current.password = e.target.value;
                }}
                name="password"
                type="password"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 rounded-b-md placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md group hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Log in
            </button>
          </div>
          <div className="flex justify-center mt-6">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <div className="flex items-center justify-center mt-4 space-x-3">
            <div className="flex-grow border-t border-gray-300"></div>
            <div className="text-sm text-gray-500">OR</div>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
        </form>
      </div>
      <div className="w-full max-w-md p-8 mt-4 space-y-8 bg-white border border-gray-200 rounded-md shadow-lg">
        <div className="text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <a href="#" className="font-medium text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
