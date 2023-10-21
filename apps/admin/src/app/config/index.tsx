import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import * as React from "react";
import Card from "./Card";
import dataOptions, { DataOption } from "./data/data-options";
import { validPaths } from "@/utils";
import { FaCogs } from "react-icons/fa";
import EnterpriseForm from "./forms/EnterpriseForm";
import { useModalStore } from "@/store";
import { translate } from "@/i18n";

const DeveloperOptionsModal = React.lazy(() => import("./forms/DeveloperOptions"));

interface IConfigPageProps {}

const ConfigPage: React.FC<IConfigPageProps> = (props) => {
  const {} = props;
  const { setModal } = useModalStore();

  function openModalDeveloperOptions() {
    setModal({
      title: "Developer Options",
      children: (
        <React.Suspense fallback={<></>}>
          <DeveloperOptionsModal />
        </React.Suspense>
      ),
    });
  }

  const onClickOption = (id: DataOption["id"]) => {
    if (id === "developer-options") return openModalDeveloperOptions;
    return null;
  };

  return (
    <HeaderDashboard
      title={translate("settings.title")}
      breadcrumbs={[
        { label: translate("dashboard.title"), to: validPaths.home.path },
        { label: translate("settings.title") },
      ]}
      to={validPaths.home.path}
      icon={<FaCogs />}
    >
      <div className="grid lg:grid-cols-3 gap-4">
        <div>
          <div className="tile">
            <h2 className="text-xl font-bold text-center mb-3">
              {translate("settings.enterPriseData.title")}
            </h2>

            <EnterpriseForm />
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="grid lg:grid-cols-2 gap-4">
            {dataOptions.map((option, idx) => (
              <Card {...option} key={idx} onClick={(() => onClickOption(option.id))()} />
            ))}
          </div>
        </div>
      </div>
    </HeaderDashboard>
  );
};

export default ConfigPage;

interface ICheckRenderCardProps {
  children?: React.ReactNode;
  option: DataOption;
}
