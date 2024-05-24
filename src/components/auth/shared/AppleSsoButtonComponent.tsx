import React, { FunctionComponent, useState } from "react";
import { NblocksButton } from "../../shared/NblocksButton";
import { useTranslation } from "react-i18next";
import { AppleLogo } from "./logos/apple.logo";

type ComponentProps = {
  label: "login" | "signup" | "continue";
  onClick: () => void;
};

const AppleSsoButtonComponent: FunctionComponent<ComponentProps> = ({
  onClick,
  label,
}) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const renderText = () => {
    switch (label) {
      case "signup":
        return t("Sign up with Apple");
      case "continue":
        return t("Continue with Apple");
      case "login":
      default:
        return t("Sign in with Apple");
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
          <AppleLogo />
        </div>
        {renderText()}
      </NblocksButton>
    </div>
  );
};

export { AppleSsoButtonComponent };
