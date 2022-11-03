import React, { FunctionComponent } from "react";

type ConfigObject = {
  name?: string;
};

const SafeUserNameComponent: FunctionComponent<ConfigObject> = ({ name }) => {
  return <span>{name ? name : "Invited user"}</span>;
};

export { SafeUserNameComponent };
