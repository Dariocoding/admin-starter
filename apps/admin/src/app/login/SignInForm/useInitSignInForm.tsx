import { useAuthStore, useModalStore } from "@/store";
import {
  getUserRememberLocalStorage,
  storeUserRememberLocalStorage,
} from "@/utils/transformUserToUserRemember";
import { LoginUserDto, authService, usersService } from "@teslo/services";
import { FormikProps } from "formik";
import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { ISignInFormProps } from ".";
import { validPaths } from "@/utils";
import useTimeOutMessage from "@/utils/hooks/useTimeOutMessage";
import { validate as validateUUID } from "uuid";
import * as Yup from "yup";
import { ValidRoles } from "@teslo/interfaces";
import toast from "react-hot-toast";

const ForgottenPasswordForm = React.lazy(() => import("../ForgottenPasswordForm"));

export const useInitSignInForm = (props: ISignInFormProps, INITIAL_VALUES: LoginUserDto) => {
  const { userRemember, setUserRemember } = props;
  const [loading, setLoading] = React.useState(true);
  const [message, setMessage] = useTimeOutMessage();
  const [checked, setChecked] = React.useState(false);
  const initAuthenticate = useAuthStore((state) => state.initAuthenticate);
  const refFormik = React.useRef<FormikProps<LoginUserDto>>(null);
  const { formatMessage } = useIntl();
  const { setModal } = useModalStore();
  const navigate = useNavigate();

  const onSubmit = async (values: LoginUserDto) => {
    try {
      const req = await authService.logIn(values);
      if (req.data.user?.roles.includes(ValidRoles.USER)) {
        toast.error(formatMessage({ id: "login.error.isCustomer" }));
        return;
      }
      await initAuthenticate(req.data);
      if (checked || userRemember) {
        storeUserRememberLocalStorage(req.data.user);
      } else {
        localStorage.removeItem("userRemember");
      }
      navigate(validPaths.dashboard.path);
    } catch (error) {
      console.log(error);
      let errorMessage: string;
      if (typeof error.response.data.message === "string") {
        errorMessage = error.response.data.message;
      } else if (Array.isArray(error.response.data.message) && error.response.data.message[0]) {
        if (typeof error.response.data.message[0] === "string") {
          errorMessage = error.response.data.message[0];
        }
      }

      if (errorMessage === "Credentials are not valid (password)") {
        setMessage(formatMessage({ id: "login.error.password.incorrect" }));
      } else if (errorMessage === "Credentials are not valid (username)") {
        setMessage(formatMessage({ id: "login.error.username.notFound" }));
      } else if (errorMessage === "password must be longer than or equal to 6 characters") {
        setMessage(formatMessage({ id: "login.error.password.invalidLength" }));
      } else {
        setMessage(errorMessage);
      }
    }
  };

  const forgottenPasswordFn = () => {
    setModal({
      title: formatMessage({ id: "login.forgotPassword" }),
      children: (
        <React.Suspense fallback={<></>}>
          <ForgottenPasswordForm defaultEmail={refFormik.current.values.username} />
        </React.Suspense>
      ),
    });
  };

  React.useEffect(() => {
    async function init() {
      const userRemember = getUserRememberLocalStorage();
      if (validateUUID(userRemember)) {
        try {
          setLoading(true);
          const { data: user } = await usersService.getUser(userRemember);

          if (!user) {
            setUserRemember(null);
            setLoading(false);
            return;
          }
          refFormik.current.setValues({
            ...INITIAL_VALUES,
            username: user?.email,
          });
          setUserRemember(user);
        } catch (error) {
          setUserRemember(null);
        } finally {
          setLoading(false);
        }
      } else setLoading(false);
    }

    init();
  }, []);

  React.useEffect(() => {
    if (!userRemember) {
      refFormik.current.setValues(INITIAL_VALUES);
    }
  }, [userRemember]);

  return {
    loading,
    message,
    onSubmit,
    refFormik,
    checked,
    setChecked,
    forgottenPasswordFn,
  };
};
