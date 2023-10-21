import * as React from "react";
import { Breadcrumb, Breadcrumbs } from "react-rainbow-components";
import { useNavigate } from "react-router-dom";

export interface IBreadCrumbHeaderDashboardProps {
  breadcrumbs: { label: string; to?: string }[];
}

const BreadCrumbHeaderDashboard: React.FC<IBreadCrumbHeaderDashboardProps> = (props) => {
  const { breadcrumbs } = props;
  const navigate = useNavigate();
  return (
    <Breadcrumbs>
      {breadcrumbs.map((breadcumb, idx) => (
        <Breadcrumb
          key={idx}
          label={breadcumb.label}
          onClick={() => breadcumb.to && navigate(breadcumb.to)}
          className="text-xs"
        />
      ))}
    </Breadcrumbs>
  );
};

export default BreadCrumbHeaderDashboard;
