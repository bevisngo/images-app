import { cookies } from "next/headers";

const useAuth = () => {
  const cookieStore = cookies();

  const isLoggedIn = () => {
    const token = cookieStore.get("authorization");
    return !!token;
  };

  return { isLoggedIn };
};

export default useAuth;
