import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

type ConfigObject = {
  name?: string;
};

const SafeUserNameComponent: FunctionComponent<ConfigObject> = ({ name }) => {
  const { t } = useTranslation();
  return <span>{name ? name : t("Invited user")}</span>;
};

export { SafeUserNameComponent };
