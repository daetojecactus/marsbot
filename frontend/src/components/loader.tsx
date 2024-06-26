import React from "react";
import { Spin } from "antd";

export default function Loader () {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", 
        backgroundColor: "white",
      }}
    >
      <Spin size="large"/>
    </div>
  );
};

