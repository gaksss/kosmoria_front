import { ReactNode } from "react";

export const metadata = {
  title: "Profile | Kosmoria",
  description: "Regardez votre profil Kosmoria",
};

interface LoginLayoutProps {
  children: ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return children;
}
