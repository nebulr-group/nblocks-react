import React, { FunctionComponent } from "react";
import { classNameFilter } from "../../utils/ComponentHelpers";

/**
 * Defines the type of configuration object
 * that can be passed to TextComponent.
 */
type ConfigObject = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  colorName?: string;
  size?: "sm" | "base";
  breakType?: "normal" | "words" | "all";
  whitespaceType?: "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap";
  overflowType?: "turnicate" | "ellipsis" | "clip";
  customizableClass?: boolean;
};

/**
 * Configurable paragraph component.
 *
 * @param param0
 * @returns The responsive paragraph component.
 */
const TextComponent: FunctionComponent<ConfigObject> = ({
  children,
  size,
  className,
  style,
  breakType,
  whitespaceType,
  overflowType,
  colorName,
  customizableClass = true,
}) => {
  className = className ? className : "";
  return (
    <p
      className={classNameFilter(
        className,
        getTextSizeStyle(size),
        getTextBreakType(breakType),
        getWhitespaceType(whitespaceType),
        getTextOverflowType(overflowType),
        getTextColor(colorName),
        customizableClass && "customizable"
      )}
      style={style}
    >
      {children}
    </p>
  );
};
const getTextColor = (colorName?: ConfigObject["colorName"]) => {
  return colorName ? colorName : "text-gray-900";
};

/**
 *
 * @param overflowType
 * @returns
 */
const getTextOverflowType = (overflowType: ConfigObject["overflowType"]) => {
  switch (overflowType) {
    case "clip":
      return "text-clip";
    case "ellipsis":
      return "text-ellipsis";
    case "turnicate":
      return "turnicate";
    default:
      return undefined;
  }
};

/**
 *
 * @param size
 * @returns
 */
const getTextSizeStyle = (size: ConfigObject["size"]) => {
  switch (size) {
    case "sm":
      return "text-sm";
    case "base":
      return "text-base";
    default:
      return undefined;
  }
};

/**
 *
 * @param whitespaceType
 * @returns
 */
const getWhitespaceType = (whitespaceType: ConfigObject["whitespaceType"]) => {
  switch (whitespaceType) {
    case "normal":
      return "whitespace-normal";
    case "nowrap":
      return "whitespace-nowrap";
    case "pre":
      return "whitespace-pre";
    case "pre-line":
      return "whitespace-pre-line";
    case "pre-wrap":
      return "whitespace-wrap";
    default:
      return undefined;
  }
};

/**
 *
 * @param breakType
 * @returns
 */
const getTextBreakType = (breakType: ConfigObject["breakType"]) => {
  switch (breakType) {
    case "normal":
      return "break-normal";
    case "words":
      return "break-words";
    case "all":
      return "break-all";
    default:
      return undefined;
  }
};

export { TextComponent };
