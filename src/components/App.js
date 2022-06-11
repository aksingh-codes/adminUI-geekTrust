// Components
import { Avatar, Layout } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import AdminUI from "./AdminUI/AdminUI";

// CSS
import "antd/dist/antd.min.css"; // https://github.com/ant-design/ant-design/issues/33327

function App() {
  return (
    <div className="App">
      <Layout>
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
        <Content style={{ padding: "50px 50px 0" }}>
          <AdminUI />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright 2022 @aksingh-codes
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
