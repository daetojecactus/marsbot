import React from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import withAuth from "../hoc/withAuth";
import "../styles/global.scss";
import "../styles/styles.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

    // Определяем, нужно ли применять withAuth к текущей странице
    const isLoginPage = router.pathname === "/";
    const ProtectedComponent = isLoginPage ? Component : withAuth(Component);

    return <ProtectedComponent {...pageProps} />;
}