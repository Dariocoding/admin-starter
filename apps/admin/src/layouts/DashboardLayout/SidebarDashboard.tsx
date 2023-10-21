import * as React from "react";
import classNames from "classnames";
import useResponsive from "@/utils/hooks/useResponsive";
import RenderIf from "@/components/ui/RenderIf";
import "./styles/_side-nav.css";
import Logo from "../Logo";
import { useDashboardStore } from "./store/dashboardStore";

import { useConfigApp } from "@/store";

const Drawer = React.lazy(() => import("@/components/ui/Drawer"));
const VerticalMenuContent = React.lazy(() => import("./VerticalMenu/VerticalMenuContent"));
const HorizontalMenu = React.lazy(() => import("./HorizontalMenu"));
const VerticalMenu = React.lazy(() => import("./VerticalMenu"));

interface ISidebarDashboardProps {}

const SidebarDashboard: React.FC<ISidebarDashboardProps> = (props) => {
  const {} = props;
  const { closeCollapse, isCollapsed } = useDashboardStore();
  const { mobile, desktop } = useResponsive();
  const { colors } = useConfigApp();
  return (
    <React.Fragment>
      <RenderIf isTrue={mobile}>
        <Drawer
          title={<Logo type="full" />}
          isOpen={isCollapsed}
          onClose={closeCollapse}
          bodyClass={classNames("side-nav-light", "p-0")}
          width={280}
          placement={"left"}
        >
          <React.Suspense fallback={<></>}>
            <RenderIf isTrue={isCollapsed}>
              <VerticalMenuContent />
            </RenderIf>
          </React.Suspense>
        </Drawer>
      </RenderIf>

      <RenderIf isTrue={desktop}>
        {colors.isHeaderTop ? <HorizontalMenu /> : <VerticalMenu />}
      </RenderIf>
    </React.Fragment>
  );
};

export default SidebarDashboard;
