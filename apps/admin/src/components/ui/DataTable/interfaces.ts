import React from "react";
export interface HeaderDataTable {
  field: string;
  title: React.ReactNode | React.FunctionComponent<{ currentItems: any[] }>;
  center?: boolean;
}
