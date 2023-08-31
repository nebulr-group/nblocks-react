import React, { FunctionComponent, useState } from "react";
import { NblocksButton } from "../../shared/NblocksButton";
import { ImageComponent } from "../../shared/ImageComponent";
import { useTranslation } from "react-i18next";

type ComponentProps = {
  mode: "login" | "signup";
  onClick: () => void;
};

const AzureAdSsoButtonComponent: FunctionComponent<ComponentProps> = ({
  onClick,
  mode,
}) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const azureAdLoginLogo =
    "https://img.icons8.com/?size=48&id=22989&format=png";

  const renderText = () => {
    switch (mode) {
      case "signup":
        return t("Sign up with Microsoft");
      case "login":
      default:
        return t("Sign in with Microsoft");
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
          <ImageComponent src={azureAdLoginLogo}></ImageComponent>
        </div>
        {renderText()}
      </NblocksButton>
    </div>
  );
};

export { AzureAdSsoButtonComponent };
