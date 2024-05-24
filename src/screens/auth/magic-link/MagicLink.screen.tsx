import React, { FunctionComponent, useEffect, useState } from "react";
import { AuthLayoutWrapperComponent } from "../../../components/auth/AuthLayoutWrapperComponent";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { MagicLinkSuccessComponent } from "../../../components/auth/magic-link/MagicLinkSuccessComponent";
import { MagicLinkComponent } from "../../../components/auth/magic-link/MagicLinkComponent";

interface Props {}

const MagicLinkScreen: FunctionComponent<Props> = ({}) => {
  const location = useLocation();
  const { username } = location.state || {};
  const [linkSent, setLinkSent] = useState(false);
  const [email, setEmail] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (username) {
      setEmail(username);
    }
  }, [username]);

  const onDidSendMagicLink = (email: string) => {
    setEmail(email);
    setLinkSent(true);
  };

  const renderChild = () => {
    if (linkSent) {
      return <MagicLinkSuccessComponent />;
    } else {
      return (
        <MagicLinkComponent
          init={username}
          didSendMagicLink={(email) => onDidSendMagicLink(email)}
        />
      );
    }
  };

  return (
    <AuthLayoutWrapperComponent
      heading={linkSent ? t("Check your email") : t("Login with Magic Link")}
      subHeading={
        linkSent
          ? `We sent a magic link to ${email}. The link is valid for 15 minutes.`
          : t("No password needed, just enter your email address.")
      }
    >
      {renderChild()}
    </AuthLayoutWrapperComponent>
  );
};

export { MagicLinkScreen };
