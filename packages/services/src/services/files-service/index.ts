import { ExcelParamsDto, GenerarExcelType, GenerarPdfType } from "@teslo/interfaces";
import { axiosClient } from "../../config/axios";
import { UploadImageParams, UploadImageResponse } from "./interfaces";
import { AxiosRequestConfig } from "axios";

export const filesService = {
  uploadFileProduct: (file: FormData) =>
    axiosClient.post<UploadImageResponse>("/files/product", file, {
      headers: {
        "content-type": "multipart/form-data",
      },
    }),

  uploadImageEnterprise: (params: UploadImageParams, file: FormData) =>
    axiosClient.post(`/files/logo_enterprise/${params.mode}/${params.type}`, file),

  excel: (
    data: GenerarExcelType,
    config?: AxiosRequestConfig<GenerarExcelType>,
    params?: ExcelParamsDto
  ) => axiosClient.post("/excel", data, { ...(config || {}), params }),

  pdf: (data: GenerarPdfType, config?: AxiosRequestConfig<GenerarPdfType>) =>
    axiosClient.post("/pdf/table", data, config),
};

export default filesService;
