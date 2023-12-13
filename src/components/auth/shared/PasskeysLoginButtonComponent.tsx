import React, { FunctionComponent } from "react";
import { NblocksButton } from "../../shared/NblocksButton";
import { ImageComponent } from "../../shared/ImageComponent";
import { useTranslation } from "react-i18next";
import { PasskeyLogo } from "./logos/passkey.logo";

type ComponentProps = {
  mode: "login" | "create";
  onClick: () => void;
  loading?: boolean;
};

const PasskeysLoginButtonComponent: FunctionComponent<ComponentProps> = ({
  onClick,
  mode,
  loading,
}) => {
  const { t } = useTranslation();

  const renderText = () => {
    switch (mode) {
      case "create":
        return t("Create Passkeys");
      case "login":
      default:
        return t("Sign in with Passkeys");
    }
  };

  return (
    <div>
      <NblocksButton
        size="sm"
        type="tertiary"
        fullWidth={true}
        onClick={() => onClick()}
        isLoading={loading}
      >
        <div className={"mr-3 rounded-lg w-10 h-10 overflow-hidden"}>
          <PasskeyLogo />
        </div>
        {renderText()}
      </NblocksButton>
    </div>
  );
};

export { PasskeysLoginButtonComponent };
