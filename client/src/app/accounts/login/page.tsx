import Login from "@/components/login";
import useAuth from "@/hooks/useAuth.hook";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn()) redirect("/");

  return <Login />;
}
