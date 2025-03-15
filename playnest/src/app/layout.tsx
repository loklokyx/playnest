import type React from "react";
import "@/app/globals.css";

export const metadata = {
  title: "PlayNest - Find & Join Games",
  description:
    "A social platform for finding and joining multiplayer table games",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
