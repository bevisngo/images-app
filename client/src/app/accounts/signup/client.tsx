"use client";
import { signupAPI } from "@/services/api/internal/auth.api";
import { setCookie } from "@/utils/client/ cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      email.trim() &&
      fullName.trim() &&
      username.trim() &&
      password.trim() &&
      confirmPassword.trim() &&
      password === confirmPassword
    ) {
      signupAPI({
        email,
        fullName,
        username,
        password,
        confirmPassword,
      }).then((res) => {
        console.log(res);
        setCookie("authorization", "Bearer " + res.accessToken);
        router.push("/");
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-center text-2xl font-bold mb-6">Lognagram</h1>
        <p className="text-center text-gray-600 mb-6">
          Sign up to see photos from your friends.
        </p>

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Mobile Number or Email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            type="submit"
          >
            Sign up
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          Have an account?{" "}
          <Link href="/accounts/login" className="text-blue-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
