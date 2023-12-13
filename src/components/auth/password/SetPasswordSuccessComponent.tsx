import React, { FunctionComponent } from "react";
import { LinkComponent } from "../../shared/LinkComponent";
import { useTranslation } from "react-i18next";
import { useSecureContext } from "../../../hooks/secure-http-context";

type ComponentProps = {};

const SetPasswordSuccessComponent: FunctionComponent<ComponentProps> = ({}) => {
  const { t } = useTranslation();
  const { authService } = useSecureContext();

  const loginUrl = authService.getLoginUrl({ useShortHand: true });

  return (
    <>
      <div>
        <LinkComponent
          to={loginUrl}
          type={"secondary"}
          size="sm"
          className="font-semibold"
        >
          {t("Back to login")}
        </LinkComponent>
      </div>
    </>
  );
};

export { SetPasswordSuccessComponent };
