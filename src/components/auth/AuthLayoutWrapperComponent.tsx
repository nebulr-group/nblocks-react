import React, { FunctionComponent } from "react";
import { useApp } from "../../hooks/app-context";
import { useConfig } from "../../hooks/config-context";
import { HeadingComponent } from "../shared/HeadingComponent";
import { ImageComponent } from "../shared/ImageComponent";
import { LinkComponent } from "../shared/LinkComponent";
import { SubHeadingComponent } from "../shared/SubHeadingComponent";
import { TextComponent } from "../shared/TextComponent";
import { useTranslation } from "react-i18next";

type ComponentProps = {
  children: React.ReactNode;
  heading: string;
  subHeading: string;
  showPrivacyPolicy?: boolean;
};

const AuthLayoutWrapperComponent: FunctionComponent<ComponentProps> = ({
  children,
  heading,
  subHeading,
  showPrivacyPolicy = true,
}) => {
  const app = useApp();
  const { copyrightFooter } = useConfig();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col pt-12 md:pt-24 min-h-screen">
      {/* Brand Logo Image */}
      <div className="h-12 flex justify-center">
        <ImageComponent src={app.logo as string} />
      </div>
      {/* Main Heading & SubHeading Section */}
      <div className={"mt-6 md:mt-8 text-center"}>
        <HeadingComponent size="4xl" type={"h1"}>
          {heading}
        </HeadingComponent>
        <SubHeadingComponent
          type={"secondary"}
          size={"lg"}
          className="font-normal mt-3"
        >
          <span dangerouslySetInnerHTML={{ __html: subHeading }}></span>
        </SubHeadingComponent>
      </div>
      <div className="mt-6 flex items-center flex-col">{children}</div>
      <div className="mt-auto mx-auto text-center mb-6">
        <div>
          <TextComponent size="sm">{copyrightFooter}</TextComponent>
        </div>
        {showPrivacyPolicy && (
          <div>
            <LinkComponent
              type="primary"
              to={app.privacyPolicyUrl!}
              nativeBehavior={true}
              target="_blank"
              size="sm"
              className="font-semibold"
            >
              {t("Privacy policy")}
            </LinkComponent>
          </div>
        )}
      </div>
    </div>
  );
};

export { AuthLayoutWrapperComponent };
