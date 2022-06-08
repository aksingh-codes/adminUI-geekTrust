import { Button, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditTwoTone } from "@ant-design/icons";
// import columns from "./columns";

export default function AdminTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const removeUser = (id) => {
    setLoading(true);
    const filtered = users.filter((user) => user.id !== id);
    setUsers(filtered);
    setLoading(false);
  };

  const removeSelectedUsers = () => {
    setLoading(true);
    const filtered = users.filter((user) => {
      // if this user is found in selected Rows return false
      // else return true
      let found = false;
      selectedRowKeys.forEach((key) => {
        if (key === user.id) {
          found = true;
          // delete key from selectedRowKey
        }
      });
      return !found;
    });
    setUsers(filtered);
    setLoading(false);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
      setSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Actions",
      render: (user) => {
        return (
          <div>
            <EditTwoTone style={{ cursor: "pointer", marginRight: "4px" }} />
            <DeleteOutlined
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => removeUser(user.id)}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        loading={loading}
        pagination={{ position: ["bottomCenter"] }}
        columns={columns}
        dataSource={users}
        rowKey="id"
      ></Table>

      <Button
        type="danger"
        onClick={() => {
          removeSelectedUsers();
        }}
      >
        Delete Selected
      </Button>
    </>
  );
}
