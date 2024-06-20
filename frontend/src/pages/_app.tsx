import React from "react";
import type { AppProps } from "next/app";
import "../styles/global.scss";
import "../styles/styles.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}