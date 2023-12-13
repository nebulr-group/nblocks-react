import React, { FunctionComponent, useState } from "react";
import { NblocksButton } from "../../shared/NblocksButton";
import { useTranslation } from "react-i18next";
import { MicrosoftLogo } from "./logos/microsoft.logo";

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
        <div className={"mr-3 rounded-lg w-10 h-10 overflow-hidden"}>
          <MicrosoftLogo />
        </div>
        {renderText()}
      </NblocksButton>
    </div>
  );
};

export { AzureAdSsoButtonComponent };
