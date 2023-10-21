import { getMaximiumRol } from "@/utils/getMaximiumRol";
import { User } from "@teslo/interfaces";
import dayjs from "dayjs";
import { UserTable } from "../config";
import ActionsUser from "./ActionsUser";
import { Link } from "react-router-dom";
import { validPaths } from "@/utils";

interface IMapUsersProps {
  users: User[];
  onDeleteUser: (user: User) => void;
  onUpdateUser: (user: User) => void;
}

const mapUsers = (props: IMapUsersProps): UserTable[] => {
  const { users } = props;

  return users.map((user) => ({
    ...user,
    isActiveFormatted: null,
    actions: <ActionsUser user={user} {...props} />,
    userRol: getMaximiumRol(user?.roles),
    dateCreatedFormatted: dayjs(user.dateCreated).format("DD/MM/YYYY"),
    fullName: (
      <Link to={validPaths.viewUser.fnPath(user.iduser)} className="link-table">
        {user?.firstName + " " + user?.lastName}
      </Link>
    ),
  }));
};

export default mapUsers;
