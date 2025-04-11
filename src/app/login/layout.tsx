import { ReactNode } from "react";

export const metadata = {
  title: "Connexion | BookMarket",
  description: "Connectez-vous à votre compte BookMarket",
};

interface LoginLayoutProps {
  children: ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return children;
}
