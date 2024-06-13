import React, { FunctionComponent, useState } from "react";
import { NblocksButton } from "../../shared/NblocksButton";
import { useTranslation } from "react-i18next";
import { MagicLinkLogo } from "./logos/magicLink.logo";

type ComponentProps = {
  mode: "login";
  onClick: () => void;
};

const MagicLinkLoginButtonComponent: FunctionComponent<ComponentProps> = ({
  onClick,
  mode,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const renderText = () => {
    switch (mode) {
      case "login":
      default:
        return t("Sign in with Magic Link");
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
          <MagicLinkLogo />
        </div>
        {renderText()}
      </NblocksButton>
    </div>
  );
};

export { MagicLinkLoginButtonComponent };
