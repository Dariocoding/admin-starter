import Loader from "@/components/ui/Loader";
import RenderIf from "@/components/ui/RenderIf";
import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import classNames from "classnames";
import * as React from "react";
import { Navigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { protectedRoutes, validPaths } from "@/utils";
import { useFetcUser } from "../hooks/useFetchUser";
import { UserDto, ValidRol, ValidRoles } from "@teslo/interfaces";
import { usersService } from "@teslo/services";
import { FaUser } from "react-icons/fa";
import { useIntl } from "react-intl";
import { translate } from "@/i18n";
import CustomerProfile from "./CustomerProfile";

interface IViewUserPageProps {}

const ViewUserPage: React.FunctionComponent<IViewUserPageProps> = (props) => {
  const {} = props;
  const { formatMessage } = useIntl();
  const params = useParams();
  const { data: user, isFetching, setData, error } = useFetcUser(params.id);

  if (isFetching) return <Loader loading={true} />;

  if (!Object.keys(user).length && error) return <Navigate to={protectedRoutes.users.path} />;

  async function updateUser(values: UserDto) {
    try {
      if (!values.password?.trim()) delete values.password;
      const req = await usersService.updateUser(user.iduser, values);
      setData(req.data);
      const messageSuccess = formatMessage({ id: "users.edit.success" });
      toast.success(messageSuccess);
    } catch (error) {
      console.log(error);
      const errorMessage = formatMessage({ id: "users.edit.error" });
      toast.error(error.response.data.message || errorMessage);
    }
  }

  if (!Object.keys(user).length) return <Loader loading={true} />;

  return (
    <HeaderDashboard
      to={validPaths.users.path}
      title={translate("users.single")}
      icon={<FaUser />}
      breadcrumbs={[
        { label: translate("dashboard.title"), to: validPaths.home.path },
        { label: translate("users.title"), to: validPaths.users.path },
        {
          label: user?.firstName
            ? user?.firstName + " " + user?.lastName
            : translate("users.single"),
        },
      ]}
    >
      <div className="flex flex-col xl:flex-row gap-4">
        <div>
          <CustomerProfile user={user} setUser={setData} />
        </div>
      </div>
    </HeaderDashboard>
  );
};

export default React.memo(ViewUserPage);
