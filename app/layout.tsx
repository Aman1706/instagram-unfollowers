import type { Metadata } from "next";
import "./globals.css";
import "@/styles/page.css";

export const metadata: Metadata = {
  title: "Instagram Unfollowers",
  description: "Find out who doesn't follow you back on Instagram",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Mono:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
    </head>
    <body className="min-h-screen bg-canvas text-ink antialiased font-mono">
      {children}
    </body>
  </html>
);

export default RootLayout;
