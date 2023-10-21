import ButtonFormik from "@/components/@forms/ButtonFormik";
import InputFormik from "@/components/@forms/InputFormik";
import SelectFormik, { OptionReactSelect } from "@/components/@forms/SelectFormik";
import { User, UserDto, ValidRol, ValidRoles } from "@teslo/interfaces";
import Alert from "@/components/ui/Alert";
import RenderIf from "@/components/ui/RenderIf";
import { usersService } from "@teslo/services";
import { Form, Formik } from "formik";
import * as React from "react";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import useTimeOutMessage from "@/utils/hooks/useTimeOutMessage";
import { AxiosResponse } from "axios";
import { useIntl } from "react-intl";
import { translate } from "@/i18n";
import { useConfigApp, useConfigEnterpriseStore } from "@/store";
import { capitalize } from "@/utils";
import Selects from "./Selects";
import classNames from "classnames";

interface IFormUserProps {
  onSuccess?(user: User): void;
  user?: User;
  defaultValidRole?: ValidRol[];
  renderRoles?: boolean;
}

const FormUser: React.FunctionComponent<IFormUserProps> = (props) => {
  const {
    onSuccess,
    defaultValidRole = [ValidRoles.USER],
    user: userToUpdate,
    renderRoles = true,
  } = props;
  const { colors } = useConfigApp();
  const status = userToUpdate ? "update" : "create";
  const { formatMessage } = useIntl();
  const { configEnterprise } = useConfigEnterpriseStore();
  const [errorMessage, setErrorMessage] = useTimeOutMessage(5000);

  const INITIAL_VALUES: UserDto = {
    firstName: userToUpdate?.firstName || "",
    lastName: userToUpdate?.lastName || "",
    email: userToUpdate?.email || "",
    phone: userToUpdate?.phone || "",
    ...(userToUpdate?.password && { password: userToUpdate?.password }),
    isActive: userToUpdate?.isActive ?? true,
    roles: userToUpdate?.roles || defaultValidRole,
  };

  const onSubmit = async (values: UserDto) => {
    try {
      let req: AxiosResponse<User>;
      if (status === "create") {
        req = await usersService.createUser(values);
        toast.success(formatMessage({ id: "users.add.success" }));
      } else if (status === "update") {
        req = await usersService.updateUser(userToUpdate.iduser, values);
        toast.success(formatMessage({ id: "users.edit.success" }));
      }
      if (onSuccess) onSuccess(req.data);
    } catch (error) {
      console.log(error);
      const message: string = error.response?.data?.message;
      if (message.includes("Ya existe la llave (email)")) {
        setErrorMessage(formatMessage({ id: "users.error.email.alreadyExist" }));
      } else {
        setErrorMessage(
          error.response.data.message ||
            (status === "create"
              ? formatMessage({ id: "users.add.error" })
              : formatMessage({ id: "users.edit.error" }))
        );
      }
    }
  };

  const validationSchema = yup.object({
    firstName: yup.string().required(translate("users.error.firstName.required")),
    lastName: yup.string().required(translate("users.error.lastName.required")),
    email: yup
      .string()
      .required(translate("users.error.email.required"))
      .email(translate("users.error.email.invalid")),
    ...(status === "create" && {
      password: yup
        .string()
        .required(translate("users.error.password.required"))
        .min(6, translate("users.error.password.invalidLength")),
    }),
    ...(status === "update" && {
      password: yup.string().min(6, translate("users.error.password.invalidLength")),
    }),
  });

  return (
    <Formik<UserDto>
      initialValues={INITIAL_VALUES}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <RenderIf isTrue={errorMessage}>
          <Alert type="danger" className="mb-6">
            {errorMessage}
          </Alert>
        </RenderIf>

        <div className="grid lg:grid-cols-2 lg:gap-4">
          <InputFormik
            label={translate("users.label.firstName")}
            name={"firstName"}
            placeholder={translate("users.placeholder.firstName")}
            required
          />

          <InputFormik
            label={translate("users.label.lastName")}
            name={"lastName"}
            placeholder={translate("users.placeholder.lastName")}
            required
          />
        </div>

        <InputFormik
          label={translate("users.label.email")}
          name={"email"}
          placeholder={translate("users.placeholder.email")}
          required
        />

        <InputFormik
          label={translate("users.label.phone")}
          name={"phone"}
          placeholder={translate("users.placeholder.phone")}
        />

        <InputFormik
          type={"password"}
          label={translate("users.label.password")}
          name={"password"}
          required
          placeholder={translate("users.placeholder.password")}
        />

        <Selects renderRoles={renderRoles} />

        <ButtonFormik full className="btn-primary btn-sm">
          {status === "create" ? translate("users.add") : translate("users.edit")}
        </ButtonFormik>
      </Form>
    </Formik>
  );
};

export default FormUser;

export const includesRolUser = (values: UserDto) => values.roles?.includes?.(ValidRoles.USER);
