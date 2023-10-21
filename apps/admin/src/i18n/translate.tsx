import { useIntl } from "react-intl";

export const translate = (id: string, value = {}) => useIntl().formatMessage({ id }, value);
