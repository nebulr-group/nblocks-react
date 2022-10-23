import { FunctionComponent } from "react";

type HeadingType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/**
 * Defines the type of configuration object
 * that can be passed to TitleComponent.
 */
type ConfigObject = {
  children?: React.ReactNode;
  type: HeadingType;
  className?: string;
  size?:
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl";
};

/**
 * Returns configurable HeadingComponent to which you can pass various configuration props.
 *
 * @example
 * Here's a simple example:
 * ```
 * import React from "react";
 * import { HeadingComponent } from "@nebulr-group/nblocks-react";
 *
 * const MyComponent = () => {
 *  return (
 *      <HeadingComponent type={"h1"} size={"9xl"}>
 *        Hello World
 *      </HeadingComponent>
 *  );
 * };
 * ```
 * @param param0
 * @returns The html heading element with responsive styling.
 */
const HeadingComponent: FunctionComponent<ConfigObject> = ({
  type,
  children,
  className,
  size,
}) => {
  className = className ? className : "";
  return (
    <>
      {type === "h1" && (
        <h1 className={`${className}${getHeadingBaseSize(size)}`}>
          {children}
        </h1>
      )}
      {type === "h2" && (
        <h2 className={`${className}${getHeadingBaseSize(size)}`}>
          {children}
        </h2>
      )}
      {type === "h3" && (
        <h3 className={`${className}${getHeadingBaseSize(size)}`}>
          {children}
        </h3>
      )}
      {type === "h4" && (
        <h4 className={`${className}${getHeadingBaseSize(size)}`}>
          {children}
        </h4>
      )}
      {type === "h5" && (
        <h5 className={`${className}${getHeadingBaseSize(size)}`}>
          {children}
        </h5>
      )}
      {type === "h6" && (
        <h6 className={`${className}${getHeadingBaseSize(size)}`}>
          {children}
        </h6>
      )}
    </>
  );
};

/**
 *
 * @param size
 * @returns
 */
const getHeadingBaseSize = (size: ConfigObject["size"]) => {
  switch (size) {
    case "lg":
      return " text-lg";
    case "xl":
      return " text-lg xl:text-xl";
    case "2xl":
      return " text-lg lg:text-xl xl:text-2xl";
    case "3xl":
      return " text-lg md:text-xl lg:text-2xl xl:text-3xl";
    case "4xl":
      return " text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl";
    case "5xl":
      return " text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl";
    case "6xl":
      return " text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl";
    case "7xl":
      return " text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl";
    case "8xl":
      return " text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl";
    case "9xl":
      return " text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl";
    default:
      return "";
  }
};

export { HeadingComponent };
