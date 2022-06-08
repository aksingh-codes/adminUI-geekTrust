import { DeleteOutlined, EditTwoTone } from "@ant-design/icons";

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
  // {
  //   title: "Actions",
  //   render: (_, user) => {
  //     console.log(user);
  //     return (
  //       <div>
  //         <EditTwoTone style={{ cursor: "pointer", marginRight: "4px" }} />
  //         <DeleteOutlined
  //           style={{ cursor: "pointer", color: "red" }}
  //           onClick={() => removeUser(user.id)}
  //         />
  //       </div>
  //     );
  //   },
  },
];

export default columns;
