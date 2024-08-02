import type { Metadata } from "next";
import NavigationBar from "@/layout/NavigationBar";
import useAuth from "@/hooks/useAuth.hook";

export const metadata: Metadata = {
  title: "Lonagram",
  description: "Created by Bevis Ngo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn()) {
    return <div>{children}</div>;
  }
  return (
    <div className="flex justify-end bg-[#000000] text-[#ffffff]">
      <NavigationBar />
      <div className="w-[calc(100%-200px)] min-h-screen">{children}</div>
    </div>
  );
}
