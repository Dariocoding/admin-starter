import TableUsers from "@/app/users/TableUsers.tsx";
import { User } from "@teslo/interfaces";
import * as React from "react";
import { useHeadingTableUsersDashboard } from "./useHeadingTableUsers";

interface ITableUserDashboardProps {
  users: User[];
  setUsers: React.Dispatch<User[]>;
}

const TableUserDashboard: React.FunctionComponent<ITableUserDashboardProps> = (props) => {
  const { users, setUsers } = props;
  return (
    <TableUsers
      isFetching={false}
      users={users}
      setUsers={setUsers}
      showCreate={false}
      showPagination={false}
      showSearch={false}
      heading={useHeadingTableUsersDashboard()}
      showResponsive={false}
    />
  );
};

export default TableUserDashboard;
