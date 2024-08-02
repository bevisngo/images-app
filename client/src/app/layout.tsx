import { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
type LoginLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Lonagram",
  description: "Created by Bevis Ngo",
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
