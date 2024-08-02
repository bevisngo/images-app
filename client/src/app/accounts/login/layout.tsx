import { ReactNode } from "react";

type LoginLayoutProps = {
  children: ReactNode;
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  return <div className="">{children}</div>;
}
