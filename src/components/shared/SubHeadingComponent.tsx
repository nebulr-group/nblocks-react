import { FunctionComponent } from "react";

/**
 * Defines the type of configuration object
 * that can be passed to SubHeadingComponent.
 */
type ConfigObject = {
  children?: React.ReactNode;
  className?: string;
  type: "primary" | "secondary";
  style?: React.CSSProperties;
  size?: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
};

/**
 * Configurable Subheading component.
 *
 * @example
 * Here's a simple example:
 * ```
 * import React from "react";
 * import { SubHeadingComponent } from "@nebulr-group/nblocks-react";
 *
 * const SubHeadingComponent = () => {
 *  return (
 *    <SubHeadingComponent type={"primary"} size={"6xl"}>
 *      Hello World
 *    </SubHeadingComponent>
 *  );
 * };
 * ```
 *
 * @param param0
 * @returns
 */
const SubHeadingComponent: FunctionComponent<ConfigObject> = ({
  children,
  className,
  size,
  style,
  type,
}) => {
  className = className ? className : "";

  return (
    <p
      className={`${className}${getSubHeadingBaseStyle(
        size
      )}${getSubHeadingTypeStyle(type)}`}
      style={style}
    >
      {children}
    </p>
  );
};

/**
 *
 * @param type
 * @returns
 */
const getSubHeadingTypeStyle = (type: ConfigObject["type"]) => {
  switch (type) {
    case "primary":
      return " text-gray-900";
    case "secondary":
      return " text-gray-500";
    default:
      return "";
  }
};

/**
 *
 * @param size
 * @returns
 */
const getSubHeadingBaseStyle = (size: ConfigObject["size"]) => {
  switch (size) {
    case "sm":
      return ` text-sm`;
    case "base":
      return ` text-sm xl:text-base`;
    case "lg":
      return ` text-sm lg:text-base xl:text-lg`;
    case "xl":
      return ` text-sm md:text-base lg:text-lg xl:text-xl`;
    case "2xl":
      return ` text-base md:text-lg lg:text-xl xl:text-2xl`;
    case "3xl":
      return ` text-lg md:text-xl lg:text-2xl xl:text-3xl`;
    case "4xl":
      return ` text-xl md:text-2xl lg:text-3xl xl:text-4xl`;
    case "5xl":
      return ` text-2xl md:text-3xl lg:text-4xl xl:text-5xl`;
    case "6xl":
      return ` text-3xl md:text-4xl lg:text-5xl xl:text-6xl`;
    default:
      return "";
  }
};

export { SubHeadingComponent };
