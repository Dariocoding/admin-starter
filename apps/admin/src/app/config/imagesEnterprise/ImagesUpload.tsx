import { useFormikContext } from "formik";
import * as React from "react";
import { UploadImagesValues } from ".";
import ImageUpload from "./ImageUpload";

interface IImagesUploadProps {}

const ImagesUpload: React.FunctionComponent<IImagesUploadProps> = (props) => {
  const {} = props;
  const { values, setValues } = useFormikContext<UploadImagesValues>();
  return (
    <React.Fragment>
      <ImageUpload
        value={values?.logoLightStreamline?.file}
        title={"Logo Light Streamline"}
        type="streamline"
        mode="light"
      />
      <ImageUpload
        value={values?.logoLightFull?.file}
        title={"Logo Light Full"}
        type="full"
        mode="light"
      />
      <ImageUpload
        value={values?.logoDarkStreamline?.file}
        title={"Logo Dark Streamline"}
        type="streamline"
        mode="dark"
      />
      <ImageUpload
        value={values?.logoDarkFull?.file}
        title={"Logo Dark Full"}
        type="full"
        mode="dark"
      />
    </React.Fragment>
  );
};

export default ImagesUpload;
