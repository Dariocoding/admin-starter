import ButtonFormik from "@/components/@forms/ButtonFormik";
import InputFormik from "@/components/@forms/InputFormik";
import { translate } from "@/i18n";
import { useModalStore } from "@/store";
import { validPaths } from "@/utils";
import { SendRequestPasswordRecoverDto, usersService } from "@teslo/services";
import { Form, Formik } from "formik";
import * as React from "react";
import toast from "react-hot-toast";
import { useIntl } from "react-intl";
import { createSearchParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";

interface IForgottenPasswordFormProps {
  defaultEmail?: string;
}

const ForgottenPasswordForm: React.FunctionComponent<IForgottenPasswordFormProps> = (props) => {
  const { defaultEmail } = props;
  const { formatMessage: t } = useIntl();
  const { closeModal } = useModalStore();
  const navigate = useNavigate();

  const onSubmit = async (values: SendRequestPasswordRecoverDto) => {
    try {
      await usersService.sendRequestPassword(values);
      navigate({
        pathname: validPaths.verifyEmailSent.path,
        search: createSearchParams({ email: values.email }).toString(),
      });
      toast.success(t({ id: "login.verifyPassword.sendEmail.success" }));
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || t({ id: "login.verifyPassword.sendEmail.error" })
      );
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required(translate("users.error.email.required"))
      .email(translate("users.error.email.invalid")),
  });

  const INITIAL_VALUES: SendRequestPasswordRecoverDto = {
    email: defaultEmail || "",
  };

  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form>
        <InputFormik
          name="email"
          label={translate("users.label.email")}
          placeholder={translate("users.placeholder.email")}
          showSuccess={false}
        />

        <ButtonFormik full className="btn-primary btn-sm">
          Send Email
        </ButtonFormik>
      </Form>
    </Formik>
  );
};

export default ForgottenPasswordForm;
