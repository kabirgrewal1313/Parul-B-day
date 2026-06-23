import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parul's Story",
  description: "An interactive anime visual novel for Parul's 21st birthday."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="story-shell">
          <div className="aurora" />
          <div className="ice-grid" />
          {children}
        </div>
      </body>
    </html>
  );
}
