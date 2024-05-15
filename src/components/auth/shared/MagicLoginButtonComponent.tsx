import React, { FunctionComponent } from "react";
import { NblocksButton } from "../../shared/NblocksButton";
import { useTranslation } from "react-i18next";
import { PasskeyLogo } from "./logos/passkey.logo";

type ComponentProps = {
  mode: "login";
  onClick: () => void;
  loading?: boolean;
};

const MagicLinkLoginButtonComponent: FunctionComponent<ComponentProps> = ({
  onClick,
  mode,
  loading,
}) => {
  const { t } = useTranslation();

  const renderText = () => {
    switch (mode) {
      case "login":
      default:
        return t("Sign in with Magic Link");
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

export { MagicLinkLoginButtonComponent };
