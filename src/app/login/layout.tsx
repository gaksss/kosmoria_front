import { ReactNode } from "react";

export const metadata = {
  title: "Connexion | Kosmoria",
  description: "Connectez-vous à votre compte Kosmoria",
};

interface LoginLayoutProps {
  children: ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return children;
}
