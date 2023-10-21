export interface ColorsAdmin {
  topLogoContainer: string;
  headerTop: string;
  textColor: string;
  textSubtitleSidebar: string;
  hoverNavToggle: string;
  sidebarContainer: string;
  sidebarItemHover: string;
  sidebarItemDropdown: string;
  sidebarDropdownCollapsedContainer: string;
  loaderColor: string;
  backgroundHome: string;
  isThemed: boolean;
  isThemeDarkLogin: boolean;
  isHeaderTop: boolean;
  enableClothesShopping?: boolean;
}

export interface ConfigApp {
  colorsAdmin: Partial<ColorsAdmin>;
  emailPort?: number;
  emailHost?: string;
  emailUser?: string;
  emailPassword?: string;
  emailFrom?: string;
  emailName?: string;
  emailSecure?: string;
}

export interface ColumnGenerarExcel {
  header: string;
  width?: number;
}

export interface ExcelParamsDto {
  csv?: boolean;
}

export interface GenerarExcelType {
  name: string;
  columns: ColumnGenerarExcel[];
  data: Array<Array<string | number | Date>>;
}

export interface GenerarPdfType {
  name: string;
  headers: string[];
  rows: string[][];
}

export interface ConfigAppDto extends Partial<ConfigApp> {}
