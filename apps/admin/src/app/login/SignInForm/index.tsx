import * as React from "react";
import { Form, Formik } from "formik";
import ButtonFormik from "@/components/@forms/ButtonFormik";
import RenderIf from "@/components/ui/RenderIf";
import { useConfigApp } from "@/store";
import InputFormik from "@/components/@forms/InputFormik";
import { LoginUserDto } from "@teslo/services";
import classNames from "classnames";
import Checkbox from "@/components/ui/Checkbox";
import { User } from "@teslo/interfaces";
import { translate } from "@/i18n";
import RenderMessage from "./RenderMessage";
import InfoUserRemember from "./InfoUserRemember";
import UAreNotThisUserRemember from "./UAreNotThisUserRemember";
import { useInitSignInForm } from "./useInitSignInForm";
import * as Yup from "yup";

export interface ISignInFormProps {
  userRemember?: User;
  setUserRemember?: React.Dispatch<React.SetStateAction<User>>;
}

const INITIAL_VALUES: LoginUserDto = {
  username: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

const SignInForm: React.FunctionComponent<ISignInFormProps> = (props) => {
  const { userRemember, setUserRemember } = props;
  const { colors } = useConfigApp();
  const { loading, message, onSubmit, refFormik, checked, setChecked, forgottenPasswordFn } =
    useInitSignInForm(props, INITIAL_VALUES);

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      innerRef={refFormik}
    >
      <Form>
        <RenderMessage loading={loading} message={message} />
        <InfoUserRemember userRemember={userRemember} />

        <RenderIf isTrue={!userRemember}>
          <InputFormik
            name="username"
            label={translate("login.username")}
            placeholder={translate("login.placeholder.username")}
            showSuccess={false}
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
          />
        </RenderIf>

        <InputFormik
          name="password"
          type="password"
          label={translate("login.password")}
          placeholder={translate("login.placeholder.password")}
          autoComplete="off"
          showSuccess={false}
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
          className="mb-0"
        />

        <p
          className={classNames(
            "text-xs mt-2.5 mb-2.5",
            colors.isThemed && colors.isThemeDarkLogin && "text-gray-50"
          )}
        >
          <button
            type="button"
            onClick={forgottenPasswordFn}
            className="text-blue-500 hover:text-blue-400 transition font-bold hover:underline"
          >
            {translate("login.forgotPassword")}
          </button>
        </p>

        <RenderIf isTrue={!userRemember}>
          <div className="form-group">
            <Checkbox
              classNamesCheck={classNames(
                colors.isThemed && colors.isThemeDarkLogin ? "bg-slate-800" : "bg-gray-50"
              )}
              isChecked={checked}
              onChange={() => setChecked(!checked)}
            >
              <span
                className={classNames(
                  colors.isThemed && colors.isThemeDarkLogin && "text-white",
                  "text-xs"
                )}
              >
                {translate("login.rememberMe")}
              </span>
            </Checkbox>
          </div>
        </RenderIf>

        <div>
          <ButtonFormik className="btn-primary btn-sm mb-0 mr-0" full>
            {translate("login.signIn")}
          </ButtonFormik>
        </div>

        <UAreNotThisUserRemember userRemember={userRemember} setUserRemember={setUserRemember} />
      </Form>
    </Formik>
  );
};

export default SignInForm;
