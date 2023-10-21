import { ConfigApp, ConfigAppDto } from "@teslo/interfaces";
import { axiosClient } from "../../config";

export type GetAppConfigParams = ("email" | "colors")[];

export const configAppService = {
  find: (params: GetAppConfigParams) =>
    axiosClient.get<ConfigApp>("/config-app", {
      params: {
        values: params,
      },
    }),
  update: (data: ConfigAppDto) => axiosClient.put<ConfigApp>("/config-app", data),
};
