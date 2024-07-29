// providers.tsx
"use client";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

export function Providers({ children,pageProps }: { children: React.ReactNode,pageProps:AppProps["pageProps"] }) {
  return <SessionProvider>{children}</SessionProvider>;
}