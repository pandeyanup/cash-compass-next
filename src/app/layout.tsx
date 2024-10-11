import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "~/components/Navbar";

export const metadata: Metadata = {
  title: "CashCompass",
  description:
    "CashCompass is your ultimate budgeting tool, designed to help you navigate your finances effortlessly. Track your income and expenses, set financial goals, and gain insights into your spending habits. With intuitive features and real-time updates, CashCompass empowers you to take control of your financial journey. Start budgeting smarter today!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <Navbar />
          <main className="m-2">{children}</main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
