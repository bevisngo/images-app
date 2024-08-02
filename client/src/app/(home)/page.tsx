import Login from "@/components/login";
import useAuth from "@/hooks/useAuth.hook";
import HomeClient from "./client";

export default function HomePage() {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn()) return <Login />;
  return <HomeClient />;
}
