import Logo, { ILogoProps } from "@/layouts/Logo";
import Upload, { IUploadProps } from "@/components/ui/Upload";
import { useFormikContext } from "formik";
import * as React from "react";
import { FcImageFile } from "react-icons/fc";
import { UploadImagesValues, ValueLogo } from ".";
import { capitalize } from "@/utils";

interface IImageUploadProps extends IUploadProps {
  value: File | null;
  title: React.ReactNode;
  type: ILogoProps["type"];
  mode: ILogoProps["mode"];
}

const ImageUpload: React.FunctionComponent<IImageUploadProps> = (props) => {
  const { value, title, type, mode, ...restProps } = props;
  const { setValues, values } = useFormikContext<UploadImagesValues>();

  return (
    <div className="tile">
      <div className="mb-4">
        <h6 className="font-normal text-xl mb-2">{title}</h6>
        {mode === "dark" ? (
          <div className="bg-neutral-900 rounded-lg p-3">
            <Logo type={type} mode={mode} />
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-3">
            <Logo type={type} mode={mode} />
          </div>
        )}
      </div>
      <div className="mb-2">
        <Upload
          fileList={value ? [value] : []}
          accept="image/png"
          onChange={(file) => {
            setValues({
              ...values,
              [`logo${capitalize(mode)}${capitalize(type)}`]: {
                file: file[0],
                mode,
                type,
              },
            });
          }}
          onFileRemove={() => {
            setValues({
              ...values,
              [`logo${capitalize(mode)}${capitalize(type)}`]: {
                file: null,
                mode,
                type,
              },
            });
          }}
          {...restProps}
        >
          <div className="my-4 text-center text-sm">
            <div className="text-2xl mb-2 flex justify-center">
              <FcImageFile />
            </div>
            <p className="font-semibold">
              <span className="text-gray-800 dark:text-white">Drop your image here, or </span>
              <span className="text-blue-500">browse</span>
            </p>
            <p className="mt-1 opacity-60 dark:text-white">Support: jpeg, jpg, png, webp</p>
          </div>
        </Upload>
      </div>
    </div>
  );
};

export default ImageUpload;
