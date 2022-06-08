// Components
import { Layout } from "antd";
import { Content, Footer } from "antd/lib/layout/layout";
import AdminTable from "./components/AdminTable/AdminTable";
import Header from "./components/Layouts/MyHeader";

// CSS
import "./App.css";
import "antd/dist/antd.css";

function App() {
  return (
    <div className="App">
      <Layout>
        <Header />
        <Content
          style={{
            padding: "50px 50px 0",
          }}
        >
          <AdminTable />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright 2022 @aksingh-codes
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
