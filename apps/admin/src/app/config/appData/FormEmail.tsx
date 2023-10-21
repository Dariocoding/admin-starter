import ButtonFormik from "@/components/@forms/ButtonFormik";
import InputFormik from "@/components/@forms/InputFormik";
import { ConfigApp } from "@teslo/interfaces";
import { configAppService } from "@teslo/services";
import { Form, Formik } from "formik";
import * as React from "react";
import { toast } from "react-hot-toast";

interface IFormEmailProps {
  data: UpdateEmailDto;
}

export type UpdateEmailDto = Pick<
  ConfigApp,
  "emailFrom" | "emailHost" | "emailPort" | "emailUser" | "emailPassword" | "emailName"
>;

const FormEmail: React.FunctionComponent<IFormEmailProps> = (props) => {
  const { data } = props;

  const onSubmit = async (values: UpdateEmailDto) => {
    try {
      await configAppService.update({
        emailFrom: values.emailFrom,
        emailHost: values.emailHost,
        emailName: values.emailName,
        emailPassword: values.emailPassword,
        emailPort: values.emailPort,
        emailUser: values.emailUser,
      });
      toast.success("Email updated");
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const INITIAL_VALUES: UpdateEmailDto = {
    emailFrom: data.emailFrom || "",
    emailHost: data.emailHost || "",
    emailName: data.emailName || "",
    emailPassword: data.emailPassword || "",
    emailPort: data.emailPort || 465,
    emailUser: data.emailUser || "",
  };

  return (
    <Formik onSubmit={onSubmit} initialValues={INITIAL_VALUES}>
      <Form>
        <InputFormik name="emailUser" label={"User"} placeholder="User Email" />
        <InputFormik name="emailPassword" label={"Password"} placeholder="Password Email" />
        <div className="grid lg:grid-cols-2 gap-x-4">
          <InputFormik name="emailFrom" placeholder="Email From" label={"From"} />
          <InputFormik name="emailName" label={"Name"} placeholder="Email Name" />
          <InputFormik name="emailHost" label={"Host"} placeholder="Email Host" />
          <InputFormik
            name="emailPort"
            type="number"
            decimalScale={0}
            decimalValues={false}
            label={"Port"}
            placeholder="Email Port"
          />
        </div>

        <ButtonFormik full className="btn btn-sm btn-primary mb-0">
          Save Changes
        </ButtonFormik>
      </Form>
    </Formik>
  );
};

export default FormEmail;
