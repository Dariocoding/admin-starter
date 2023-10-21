import AuthLayout from "@/layouts/AuthLayout";
import RenderIf from "@/components/ui/RenderIf";
import { AiOutlineLoading } from "react-icons/ai";
import * as React from "react";
import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import InputFormik from "@/components/@forms/InputFormik";
import ButtonFormik from "@/components/@forms/ButtonFormik";
import { translate } from "@/i18n";
import classNames from "classnames";
import { useConfigApp } from "@/store";
import { validPaths } from "@/utils";
import { RecoverPasswordDto, usersService } from "@teslo/services";
import { User } from "@teslo/interfaces";
import { toast } from "react-hot-toast";
import { BsFillShieldLockFill } from "react-icons/bs";
import { useIntl } from "react-intl";
import Swal from "sweetalert2";

interface IRecoverPasswordPageProps {}

const INITIAL_VALUES = {
  password: "",
  passwordConfirm: "",
};

const RecoverPasswordPage: React.FunctionComponent<IRecoverPasswordPageProps> = (props) => {
  const {} = props;
  const { formatMessage: t } = useIntl();
  const [user, setUser] = React.useState<User>(null);
  const navigate = useNavigate();
  const { colors } = useConfigApp();
  const { iduser, token } = useParams();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const req = await usersService.getUserByIdAndToken(iduser, token);
        setUser(req.data);
      } catch (error) {
        console.log(error);
        navigate(validPaths.home.path);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const onSubmit = async (values: typeof INITIAL_VALUES) => {
    if (values.password !== values.passwordConfirm) {
      return toast.error(t({ id: "login.recover.error.passwordDoNotMatch" }));
    }
    const idToast = toast.loading(t({ id: "login.recover.loading.toast" }));
    try {
      const data: RecoverPasswordDto = {
        ...values,
        email: user?.email,
        iduser: user.iduser,
        token,
      };
      await usersService.recoverPassword(data);
      Swal.fire(t({ id: "login.recover.success" }), "", "success");
      navigate(validPaths.home.path);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      toast.dismiss(idToast);
    }
  };

  return (
    <AuthLayout showLogo>
      <RenderIf isTrue={loading}>
        <div className="flex items-center justify-center absolute w-full h-full top-0 left-0 z-10 bg-white bg-opacity-10 backdrop-filter backdrop-blur-[2px] rounded-lg">
          <AiOutlineLoading className="text-2xl w-12 h-12 text-black animate-spin" />
        </div>
      </RenderIf>
      <Formik initialValues={INITIAL_VALUES} onSubmit={onSubmit}>
        <Form className="mt-4">
          <div className="form-group">
            <h6
              className={classNames(
                "text-center text-xl flex items-center justify-center",
                colors.isThemed && colors.isThemeDarkLogin && "text-gray-100"
              )}
            >
              <span>{translate("login.recover.password.title")}</span>{" "}
              <BsFillShieldLockFill
                className={classNames(
                  "text-base ml-1",
                  colors.isThemed && colors.isThemeDarkLogin && "text-white"
                )}
              />
            </h6>
            <h6
              className={classNames(
                "text-sm text-center",
                colors.isThemed && colors.isThemeDarkLogin && "text-gray-100"
              )}
            >
              {user?.firstName + " " + user?.lastName}
            </h6>
            <p
              className={classNames(
                colors.isThemeDarkLogin && colors.isThemed && "text-gray-100",
                "text-xs text-center mt-0"
              )}
            >
              {user?.email}
            </p>
          </div>

          <InputFormik
            name="password"
            autoComplete="off"
            type="password"
            label={translate("login.recover.password.label.password")}
            placeholder={translate("login.recover.password.placeholder.password")}
            classNameInput={classNames(
              colors.isThemed &&
                colors.isThemeDarkLogin &&
                "bg-gray-800 text-gray-50 border-slate-700"
            )}
            classNameLabel={classNames(
              "text-xs",
              colors.isThemed && colors.isThemeDarkLogin && "text-gray-50"
            )}
            showError={false}
            showSuccess={false}
          />
          <InputFormik
            name="passwordConfirm"
            type="password"
            label={translate("login.recover.confirmPassword.label.confirmPassword")}
            placeholder={translate("login.recover.confirmPassword.placeholder.confirmPassword")}
            classNameInput={classNames(
              colors.isThemed &&
                colors.isThemeDarkLogin &&
                "bg-gray-800 text-gray-50 border-slate-700"
            )}
            classNameLabel={classNames(
              "text-xs",
              colors.isThemed && colors.isThemeDarkLogin && "text-gray-50"
            )}
            showError={false}
            showSuccess={false}
          />
          <ButtonFormik className="btn-primary btn-sm mb-0" full disabled={loading}>
            {translate("app.save")}
          </ButtonFormik>
        </Form>
      </Formik>
    </AuthLayout>
  );
};

export default RecoverPasswordPage;
