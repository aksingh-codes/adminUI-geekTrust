import { Button, Form, Input, notification, Table, Tooltip } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditTwoTone, SaveOutlined } from "@ant-design/icons";

const openNotification = (placement, message) => {
  notification.info({
    message: `Notification`,
    description: `${message}`,
    placement,
  });
};

export default function AdminTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();

  const removeUser = async (id) => {
    setLoading(true);
    let deletedUser;
    console.log(users);
    const filtered = users.filter((user) => {
      if (user.id !== id) {
        return true;
      }
      deletedUser = user;
      return false;
    });

    setUsers(filtered);
    openNotification(
      "bottomLeft",
      `Deleted: ${deletedUser.name} successfully.`
    );
  };

  const removeSelectedUsers = () => {
    setLoading(true);
    let deletedUsers = [];
    const filtered = users.filter((user) => {
      // if this user is found in selected Rows return false
      // else return true
      let found = false;
      selectedRows.forEach((record) => {
        if (record.id === user.id) {
          found = true;
          // delete key from selectedRowKey
        }
      });
      if (found) {
        deletedUsers.push(user.name);
      }
      return !found;
    });
    setUsers(filtered);
    const message =
      deletedUsers.length !== 0
        ? `Deleted: ${deletedUsers.toString()} succesfully.`
        : `Select something to delete.`;
    openNotification("bottomRight", message);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // setSelectedRowKeys(selectedRowKeys);
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
            <Tooltip placement="top" title={"edit"}>
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
            </Tooltip>
            <Tooltip placement="top" title={"delete"}>
              <DeleteOutlined
                style={{ cursor: "pointer", marginRight: "4px", color: "red" }}
                onClick={() => removeUser(record.id)}
              />
            </Tooltip>

            {editingRow === record.id && (
              <Tooltip placement="top" title={"save"}>
                <Button htmlType="submit" type="text" style={{ padding: 0 }}>
                  <SaveOutlined />
                </Button>
              </Tooltip>
            )}
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

  useEffect(() => {
    setLoading(false);
  }, [users]);

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
    <>
      <Form form={form} onFinish={onFinish}>
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
      </Form>
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
