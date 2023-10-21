import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import { validPaths } from "@/utils";
import * as React from "react";
import { AiOutlineBgColors } from "react-icons/ai";
import ShowColors from "./ShowColors";
import FormColors from "./FormColors";
import RecomendedColors from "./RecommendedColors";
import { useConfigApp } from "@/store";
import { translate } from "@/i18n";
import OptionsApp from "./OptionsApp";
import ActionsForm from "./ActionsForm";

interface IColorsPageProps {}

const ColorsPage: React.FunctionComponent<IColorsPageProps> = (props) => {
  const {} = props;

  return (
    <HeaderDashboard
      to={validPaths.settings.path}
      breadcrumbs={[
        {
          to: validPaths.dashboard.path,
          label: translate("dashboard.title"),
        },

        {
          to: validPaths.settings.path,
          label: translate("settings.title"),
        },
        {
          to: validPaths.colorsAdmin.path,
          label: "Colors",
        },
      ]}
      icon={<AiOutlineBgColors />}
      title={"Colors Admin"}
    >
      <div className="grid lg:grid-cols-7 gap-4">
        <div className="lg:col-span-3">
          <div className="tile p-3.5 mb-2">
            <FormColors />
          </div>
          <div className="tile p-3.5 mb-2">
            <OptionsApp />
          </div>
          <div className="tile p-3.5 mb-2">
            <ActionsForm />
          </div>
          <RecomendedColors />
        </div>
        <div className="tile lg:col-span-4">
          <ShowColors />
        </div>
      </div>
    </HeaderDashboard>
  );
};

export default ColorsPage;
