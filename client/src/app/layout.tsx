import type { Metadata } from "next";
import "./globals.css";
import NavigationBar from "@/layout/NavigationBar";
import Modal from "@/components/widgets/Modal";

export const metadata: Metadata = {
  title: "Lona",
  description: "Created by Bevis Ngo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex justify-end bg-[#000000] text-[#ffffff]">
        <NavigationBar />
        <div className="w-[calc(100%-200px)]">{children}</div>
      </body>
    </html>
  );
}
