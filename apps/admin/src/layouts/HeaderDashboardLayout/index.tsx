import * as React from "react";
import ButtonBack from "./ButtonBack";
import BreadCrumbHeaderDashboard, {
	IBreadCrumbHeaderDashboardProps,
} from "./BreadCrumbHeaderDashboard";

interface IHeaderDashboardProps {
	children?: React.ReactNode;
	to?: string;
	icon: React.ReactNode;
	title: React.ReactNode;
	breadcrumbs?: IBreadCrumbHeaderDashboardProps["breadcrumbs"];
}

const HeaderDashboard: React.FunctionComponent<IHeaderDashboardProps> = props => {
	const { to, icon, title, breadcrumbs = [] } = props;
	return (
		<div className="mb-2">
			<div className="p-4 lg:py-6 bg-white print:hidden">
				<div className="flex justify-between items-center flex-wrap gap-y-2">
					<div className="flex items-center justify-start gap-2">
						<ButtonBack to={to} />

						<span className="text-xl">{icon}</span>
						<span className="font-semibold text-lg">{title}</span>
					</div>
					<div className="lg:mt-0 mt-1">
						<BreadCrumbHeaderDashboard breadcrumbs={breadcrumbs} />
					</div>
				</div>
			</div>
			<div className="p-4 print:p-0">{props.children}</div>
		</div>
	);
};

export default HeaderDashboard;
