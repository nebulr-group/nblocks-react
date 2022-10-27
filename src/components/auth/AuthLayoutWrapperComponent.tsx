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
    <div>
      <div className="h-12">
        <ImageComponent src={app.logo as string} />
      </div>
      <HeadingComponent size="3xl" type={"h1"}>
        {heading}
      </HeadingComponent>
      <SubHeadingComponent type={"secondary"} size="2xl">
        {subHeading}
      </SubHeadingComponent>
      <div className="space-y-6 py-6">{children}</div>
      <div>
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
          >
            Privacy policy
          </LinkComponent>
        </div>
      </div>
    </div>
  );
};

export { AuthLayoutWrapperComponent };
