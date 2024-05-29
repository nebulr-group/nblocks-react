import React, { FunctionComponent } from "react";
import { PasswordValidationPropmtMessage } from "../../hooks/use-password-validation";
import { AlertComponent } from "./AlertComponent";

const ValidationMessageComponent: FunctionComponent<{
  feedbackLog: PasswordValidationPropmtMessage[];
}> = ({ feedbackLog }) => {
  return (
    <>
      <AlertComponent
        type="warning"
        messages={feedbackLog.map((f) => f.error!)}
        title={""}
      />
    </>
  );
};

export { ValidationMessageComponent };
