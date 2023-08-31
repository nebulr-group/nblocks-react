import React, { FunctionComponent, useState } from "react";
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
  const [loading, setLoading] = useState(false);
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

  const didClick = () => {
    setLoading(true);
    onClick();
  };

  return (
    <div>
      <NblocksButton
        size="sm"
        type="tertiary"
        fullWidth={true}
        onClick={() => didClick()}
        isLoading={loading}
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
