import { FunctionComponent } from "react";
import { PasswordValidationPropmtMessage } from "../../hooks/usePasswordValidation";
import { TextComponent } from "./TextComponent";

const ValidationMessageComponent: FunctionComponent<{
  feedbackLog: PasswordValidationPropmtMessage[];
}> = ({ feedbackLog }) => {
  return (
    <>
      {feedbackLog.map((message, i) => {
        return (
          <TextComponent key={i} className={"text-red-700"}>
            {message["error"]}
          </TextComponent>
        );
      })}
    </>
  );
};

export { ValidationMessageComponent };
