import React, { FunctionComponent } from "react";
import { useApp } from "../../hooks/app-context";
import { HeadingComponent } from "../shared/HeadingComponent";
import { ImageComponent } from "../shared/ImageComponent";
import { LinkComponent } from "../shared/LinkComponent";
import { SubHeadingComponent } from "../shared/SubHeadingComponent";
import { TextComponent } from "../shared/TextComponent";

type ComponentProps = {
  children: React.ReactNode;
  heading: string;
  subHeading: string;
};

const AuthLayoutWrapperComponent: FunctionComponent<ComponentProps> = ({
  children,
  heading,
  subHeading,
}) => {
  const app = useApp();

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
          {subHeading}
        </SubHeadingComponent>
      </div>
      <div className="mt-6 flex items-center flex-col">{children}</div>
      <div className="mt-auto mx-auto text-center mb-6">
        <div>
          <TextComponent size="sm">
            ©2022 Nebulr AB. All Rights Reserved.
          </TextComponent>
        </div>
        <div>
          <LinkComponent
            type="primary"
            to={app.privacyPolicyUrl!}
            nativeBehavior={true}
            target="_blank"
            size="sm"
            className="font-semibold"
          >
            Privacy policy
          </LinkComponent>
        </div>
      </div>
    </div>
  );
};

export { AuthLayoutWrapperComponent };
