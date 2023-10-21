import * as React from "react";
import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import { FaHome } from "react-icons/fa";
import { translate } from "@/i18n";

interface IDashboardPageProps {}

const DashboardPage: React.FunctionComponent<IDashboardPageProps> = (props) => {
  const {} = props;

  return <HeaderDashboard icon={<FaHome />} title={translate("dashboard.title")}></HeaderDashboard>;
};

export default React.memo(DashboardPage);
