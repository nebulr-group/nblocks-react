import React, { FunctionComponent } from "react";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { HeadingComponent } from "../../shared/HeadingComponent";
import { LinkComponent } from "../../shared/LinkComponent";
import { NblocksButton } from "../../shared/NblocksButton";
import { useTranslation } from "react-i18next";

type ComponentProps = {
  recoverCode: string;
  didClickContinue: () => void;
};

const SetupMfaRecoverCodeComponent: FunctionComponent<ComponentProps> = ({
  didClickContinue,
  recoverCode,
}) => {
  const { t } = useTranslation();
  return (
    <div className="max-w-sm w-full">
      <div className="space-y-6 flex flex-col mt-6 md:mt-8 text-center ">
        <div>
          <HeadingComponent
            size="4xl"
            type={"h1"}
            className="inline-block border-solid border border-gray-500 rounded-md py-3 px-4"
          >
            {recoverCode}
          </HeadingComponent>
        </div>
        <NblocksButton
          size="md"
          type="primary"
          fullWidth={true}
          onClick={() => didClickContinue()}
        >
          {t("Continue")}
        </NblocksButton>
      </div>

      <div className="mt-8 text-center">
        <LinkComponent
          to={RouteConfig.login.loginScreen}
          type="secondary"
          className="font-semibold"
          size="sm"
        >
          {t("Back to login")}
        </LinkComponent>
      </div>
    </div>
  );
};

export { SetupMfaRecoverCodeComponent };
