import { translate } from "@/i18n";
import { HeaderDataTable } from "@/components/ui/DataTable";

export const useHeadingTableUsersDashboard = (): HeaderDataTable[] => {
  return [
    { title: translate("users.label.fullName"), field: "fullName" },
    { title: translate("users.label.dateCreated"), field: "dateCreatedFormatted", center: true },
    { title: translate("users.label.actions"), field: "actions", center: true },
  ];
};
