import { capitalize } from "@/utils";
import classNames from "classnames";
import * as React from "react";
import { useIntl } from "react-intl";

interface IBadgeIsActiveProps {
  isActive: boolean;
}

const BadgeIsActive: React.FunctionComponent<IBadgeIsActiveProps> = (props) => {
  const { isActive } = props;
  const { formatMessage } = useIntl();
  let status = isActive
    ? capitalize(formatMessage({ id: "users.label.status.active" }))
    : capitalize(formatMessage({ id: "users.label.status.inactive" }));

  return (
    <span
      className={classNames(
        "btn btn-xs cursor-default btn-pill px-5 md:w-full ",
        isActive ? "btn-success" : "btn-danger"
      )}
    >
      {status}
    </span>
  );
};

export default BadgeIsActive;
