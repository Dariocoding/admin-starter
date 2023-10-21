import { translate } from "@/i18n";
import { HeaderDataTable } from "@/components/ui/DataTable";

export const useHeadingUsers = (): HeaderDataTable[] => {
  let headers: HeaderDataTable[] = [
    { title: translate("users.label.ID"), field: "iduser" },
    { title: translate("users.label.fullName"), field: "fullName" },
    { title: translate("users.label.email"), field: "email" },
    { title: translate("users.label.phone"), field: "phone" },
    {
      title: translate("users.label.dateCreated"),
      field: "dateCreatedFormatted",
      center: true,
    },
    /*     {
      title: translate("users.label.status"),
      field: "isActiveFormatted",
      center: true,
    }, */
    { title: translate("users.label.actions"), field: "actions", center: true },
  ];

  return headers;
};
