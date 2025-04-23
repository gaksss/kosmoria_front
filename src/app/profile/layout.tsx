import { ReactNode } from "react";
import { RaceProvider } from "@/context/race-context";

export const metadata = {
  title: "Profile | Kosmoria",
  description: "Regardez votre profil Kosmoria",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <RaceProvider>
      {children}
    </RaceProvider>
  );
}
