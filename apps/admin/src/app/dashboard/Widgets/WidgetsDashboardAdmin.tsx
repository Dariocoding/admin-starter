import { protectedRoutes } from "@/utils";
import * as React from "react";
import { AiFillAppstore } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import WidgetDashboard from "../Widget";
import { translate } from "@/i18n";

interface IWidgetsDashboardAdminProps {}

const WidgetsDashboardAdmin: React.FunctionComponent<IWidgetsDashboardAdminProps> = (props) => {
  const {} = props;

  return (
    <React.Fragment>
      {/*     

      <WidgetDashboard
        title={translate("dashboard.users")}
        Icon={FaUsers}
        value={totales.totalUsers}
        path={protectedRoutes.users.path}
        colouredIcon={"#7474f7"}
        backgroundIcon="bg-purple-600"
      /> */}
    </React.Fragment>
  );
};

export default WidgetsDashboardAdmin;
