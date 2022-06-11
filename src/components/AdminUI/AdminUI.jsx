import { Button, Form, notification } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import AdminTable from "../AdminTable/AdminTable";

const openNotification = (placement, message) => {
  notification.info({
    message: `Notification`,
    description: `${message}`,
    placement,
  });
};

export default function AdminUI() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <>
      <SearchBar setSearchQuery={setSearchQuery} />

      <AdminTable
        users={users}
        searchQuery={searchQuery}
        loading={loading}
        setLoading={setLoading}
        setUsers={setUsers}
        editingRow={editingRow}
        setEditingRow={setEditingRow}
        removeUser={removeUser}
        setSelectedRows={setSelectedRows}
        form={form}
      />

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
