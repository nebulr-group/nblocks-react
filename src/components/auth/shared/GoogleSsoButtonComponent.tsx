import React, { FunctionComponent } from "react";
import { NblocksButton } from "../../shared/NblocksButton";
import { ImageComponent } from "../../shared/ImageComponent";
import { useTranslation } from "react-i18next";

type ComponentProps = {
  mode: "login" | "signup";
  onClick: () => void;
};

const GoogleSsoButtonComponent: FunctionComponent<ComponentProps> = ({
  onClick,
  mode,
}) => {
  const { t } = useTranslation();
  const loginLogo =
    "https://developers.google.com/static/identity/images/g-logo.png";

  const renderText = () => {
    switch (mode) {
      case "signup":
        return t("Sign up with Google");
      case "login":
      default:
        return t("Sign in with Google");
    }
  };
  return (
    <div>
      <NblocksButton
        size="sm"
        type="tertiary"
        fullWidth={true}
        onClick={() => onClick()}
      >
        <div style={{ width: 48, height: 48 }}>
          <ImageComponent src={loginLogo}></ImageComponent>
        </div>
        {renderText()}
      </NblocksButton>
    </div>
  );
};

export { GoogleSsoButtonComponent };
