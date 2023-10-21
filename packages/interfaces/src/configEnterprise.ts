export interface ConfigEnterprise {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface ConfigEnterpriseDto extends Partial<ConfigEnterprise> {}
