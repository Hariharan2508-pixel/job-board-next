import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ApolloWrapper from "@/providers/ApolloProvider"
import Header from "@/components/Header";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Job Board",
  description: "Find Jobs from Top companies using our Job board application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white"
      > <a href="#main-content" className="absolute  top-auto w-px h-px overflow-hidden 
          focus:left-4 focus:top-4 focus:w-auto focus:h-auto 
          focus:p-2 focus:bg-purple-600 focus:text-white focus:rounded">skip to Main content</a><Header />
        <ApolloWrapper>
          <Providers>
        {children}
        </Providers>
        </ApolloWrapper>
      </body>
    </html>
  );
}
