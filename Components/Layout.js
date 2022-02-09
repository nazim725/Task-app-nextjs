import Head from "next/head";
import React from "react";
import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Task App</title>
      </Head>
      <Navigation />
      {children}
    </>
  );
};

export default Layout;
