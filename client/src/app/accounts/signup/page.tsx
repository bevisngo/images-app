import useAuth from "@/hooks/useAuth.hook";
import SignupClient from "./client";
import { redirect } from "next/navigation";

export default function SignupPage() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn()) redirect("/");
  return <SignupClient />;
}
