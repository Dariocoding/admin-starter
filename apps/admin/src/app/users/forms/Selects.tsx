import SelectFormik, { OptionReactSelect } from "@/components/@forms/SelectFormik";
import { RenderIf } from "@/components/ui";
import { translate } from "@/i18n";
import { ValidRoles } from "@teslo/interfaces";
import * as React from "react";

interface ISelectsProps {
  renderRoles: boolean;
}

const Selects: React.FunctionComponent<ISelectsProps> = (props) => {
  const { renderRoles } = props;
  return (
    <React.Fragment>
      {/*       <SelectFormik
        name="isActive"
        options={[
          { value: true, label: translate("users.label.status.active") },
          { value: false, label: translate("users.label.status.inactive") },
        ]}
      /> */}

      <RenderIf isTrue={renderRoles}>
        <SelectFormik
          multiple={true}
          name="roles"
          options={[
            { value: ValidRoles.ADMIN, label: translate("users.admin") },
            { value: ValidRoles.USER, label: translate("users.customer") },
          ]}
          onChange={(items: OptionReactSelect[], lastState) => {
            if (!items) return lastState;
            const copyItems = [...items];
            if (copyItems.length === 2) {
              copyItems.shift();
            }
            return copyItems.map((item) => item.value);
          }}
        />
      </RenderIf>
    </React.Fragment>
  );
};

export default Selects;
