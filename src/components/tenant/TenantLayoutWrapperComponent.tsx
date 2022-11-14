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

const TenantLayoutWrapperComponent: FunctionComponent<ComponentProps> = ({
  children,
  heading,
  subHeading,
}) => {
  const app = useApp();

  return (
    <div className="flex flex-col pt-12 md:pt-24 min-h-screen">
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
    </div>
  );
};

export { TenantLayoutWrapperComponent };
