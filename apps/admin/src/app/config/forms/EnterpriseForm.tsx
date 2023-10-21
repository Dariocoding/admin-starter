import ButtonFormik from "@/components/@forms/ButtonFormik";
import InputFormik from "@/components/@forms/InputFormik";
import TextareaFormik from "@/components/@forms/TextareaFormik";
import { translate } from "@/i18n";
import { useConfigEnterpriseStore } from "@/store";
import { ConfigEnterpriseDto } from "@teslo/interfaces";
import { configEnterpriseService } from "@teslo/services";
import { Form, Formik, FormikHelpers } from "formik";
import * as React from "react";
import { toast } from "react-hot-toast";

interface IEnterpriseFormProps {}

const EnterpriseForm: React.FunctionComponent<IEnterpriseFormProps> = (props) => {
  const {} = props;
  const { configEnterprise, setConfigEnterprise } = useConfigEnterpriseStore();
  const onSubmit = async (
    values: ConfigEnterpriseDto,
    actions: FormikHelpers<ConfigEnterpriseDto>
  ) => {
    try {
      const req = await configEnterpriseService.update(values);
      toast.success("Enterprise data updated");
      setConfigEnterprise(req.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const INITIAL_VALUES: ConfigEnterpriseDto = { ...configEnterprise };

  return (
    <Formik initialValues={INITIAL_VALUES} enableReinitialize onSubmit={onSubmit}>
      <Form>
        <InputFormik
          name="name"
          label={translate("settings.enterPriseData.label.name")}
          placeholder={translate("settings.enterPriseData.placeholder.name")}
        />

        <InputFormik
          name="email"
          label={translate("settings.enterPriseData.label.email")}
          placeholder={translate("settings.enterPriseData.placeholder.email")}
        />

        <InputFormik
          name="phone"
          label={translate("settings.enterPriseData.label.phone")}
          placeholder={translate("settings.enterPriseData.placeholder.phone")}
        />

        <TextareaFormik
          label={translate("settings.enterPriseData.label.address")}
          name={translate("settings.enterPriseData.label.address")}
          placeholder={translate("settings.enterPriseData.placeholder.address")}
        />

        <ButtonFormik className="btn-primary btn-sm mb-0" full>
          {translate("settings.enterPriseData.update")}
        </ButtonFormik>
      </Form>
    </Formik>
  );
};

export default EnterpriseForm;
