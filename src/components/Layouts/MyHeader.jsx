import React from "react";
import { Header } from "antd/lib/layout/layout";
import Avatar from "antd/lib/avatar/avatar";

export default function MyHeader() {
  return (
    <>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="logo">
          <h1 style={{ color: "white", marginBottom: 0 }}>Admin UI</h1>
        </div>
        <Avatar src="https://static.vecteezy.com/system/resources/previews/003/537/687/original/young-man-avatar-in-minimal-style-vector.jpg"></Avatar>
      </Header>
    </>
  );
}
