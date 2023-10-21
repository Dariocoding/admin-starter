import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import { validPaths } from "@/utils";
import * as React from "react";
import { BsDatabaseFillCheck } from "react-icons/bs";
import FormEmail, { UpdateEmailDto } from "./FormEmail";
import RenderIf from "@/components/ui/RenderIf";
import { configAppService } from "@teslo/services";
import { translate } from "@/i18n";

interface IAppDataPageProps {}

const AppDataPage: React.FunctionComponent<IAppDataPageProps> = (props) => {
  const {} = props;
  const [loading, setLoading] = React.useState<boolean>(true);
  const [dataEmail, setDataEmail] = React.useState<UpdateEmailDto>();

  React.useEffect(() => {
    async function init() {
      try {
        const { data } = await configAppService.find(["email"]);
        setDataEmail({
          emailFrom: data.emailFrom,
          emailHost: data.emailHost,
          emailName: data.emailName,
          emailPassword: data.emailPassword,
          emailPort: data.emailPort,
          emailUser: data.emailUser,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  return (
    <HeaderDashboard
      title={"App Data"}
      icon={<BsDatabaseFillCheck />}
      to={validPaths.settings.path}
      breadcrumbs={[
        { to: validPaths.dashboard.path, label: translate("dashboard.title") },
        {
          to: validPaths.settings.path,
          label: translate("settings.title"),
        },
        {
          label: "App Data",
        },
      ]}
    >
      <div className="grid lg:grid-cols-2 gap-4">
        <RenderIf isTrue={!loading}>
          <div>
            <div className="tile shadow-xl">
              <h6 className="text-lg mb-4">Email Data</h6>
              <FormEmail data={dataEmail} />
            </div>
          </div>
        </RenderIf>
        <RenderIf isTrue={loading}></RenderIf>
      </div>
    </HeaderDashboard>
  );
};

export default AppDataPage;
