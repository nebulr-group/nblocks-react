import React, { FunctionComponent } from "react";
import { NblocksButton } from "../../shared/NblocksButton";
import { ImageComponent } from "../../shared/ImageComponent";
import { useTranslation } from "react-i18next";

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

  const logo = "https://www.passkeys.com/assets/passkeys-logo.svg";

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
        <div style={{ width: 48, height: 48 }}>
          <ImageComponent src={logo}></ImageComponent>
        </div>
        {renderText()}
      </NblocksButton>
    </div>
  );
};

export { PasskeysLoginButtonComponent };
