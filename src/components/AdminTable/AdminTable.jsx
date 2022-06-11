import { DeleteOutlined, EditTwoTone, SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input, Table } from "antd";
import React from "react";

import search from "../../utils/search";

function AdminTable({
  users,
  searchQuery,
  loading,
  setLoading,
  editingRow,
  setUsers,
  setEditingRow,
  removeUser,
  setSelectedRows,
  form,
}) {
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const columns = [
    {
      title: <strong>Name</strong>,
      dataIndex: "name",

      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name={"name"}
              rules={[
                {
                  required: true,
                  message: "Please enter the name",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else return <p>{text}</p>;
      },
    },
    {
      title: <strong>Email</strong>,
      dataIndex: "email",
      width: "50%",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "Please enter the email",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else return <p>{text}</p>;
      },
    },
    {
      title: <strong>Role</strong>,

      dataIndex: "role",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name={"role"}
              rules={[
                {
                  required: true,
                  message: "Please enter the role",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else return <p>{text}</p>;
      },
    },
    {
      title: (
        <em>
          {" "}
          <strong>Actions</strong>
        </em>
      ),
      render: (_, record) => {
        return (
          <div>
            {editingRow === record.id ? (
              <Button htmlType="submit" type="text" style={{ padding: 0 }}>
                <SaveOutlined />
              </Button>
            ) : (
              <EditTwoTone
                onClick={() => {
                  setEditingRow(record.id);
                  form.setFieldsValue({
                    name: record.name,
                    email: record.email,
                    role: record.role,
                  });
                }}
                style={{ cursor: "pointer", marginRight: "4px" }}
              />
            )}

            <DeleteOutlined
              style={{ cursor: "pointer", marginRight: "4px", color: "red" }}
              onClick={() => removeUser(record.id)}
            />
          </div>
        );
      },
    },
  ];

  const onFinish = (values) => {
    setLoading(true);
    const updatedDataSource = [...users];

    const userIndex = updatedDataSource.findIndex(
      (user) => user.id === editingRow
    );
    console.log(userIndex);

    updatedDataSource[userIndex] = { ...values, id: editingRow };

    console.log(users);
    console.log(updatedDataSource);
    setUsers(updatedDataSource);
    setEditingRow(null);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        loading={loading}
        pagination={{ position: ["bottomCenter"] }}
        columns={columns}
        dataSource={users.filter((user) => search(user, searchQuery))}
        rowKey="id"
      ></Table>
    </Form>
  );
}

export default AdminTable;
