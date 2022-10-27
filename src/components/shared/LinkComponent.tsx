import React from "react";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

/**
 * Defines the type of configuration object
 * that can be passed to LinkComponent.
 */
type ConfigObject = {
  children?: React.ReactNode;
  type: "primary" | "secondary";
  nativeBehavior?: boolean;
  to: string;
  preventScrollReset?: boolean;
  className?: string;
  disabled?: boolean;
  reloadDocument?: boolean;
  target?: React.HTMLAttributeAnchorTarget;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
};

/**
 * This is a reusable & flexible Link component, that speeds up application development.
 *
 * @remarks
 * This component contains react-router-dom's Link component in its core.
 *
 * @param param0
 * @returns The react-router-dom's Link component with appropriate key value pairs.
 */
const LinkComponent: FunctionComponent<ConfigObject> = ({
  children,
  nativeBehavior,
  reloadDocument,
  to,
  preventScrollReset,
  className,
  type,
  size,
  disabled,
  target,
}) => {
  className = className ? className : "";
  return (
    <>
      {nativeBehavior ? (
        <a
          href={to}
          className={`${className}${getLinkTypeStyle(type)}${getDisabledStyle(
            disabled
          )}${getLinkBaseFontSizeStyle(size)}`}
          target={target}
        >
          {children}
        </a>
      ) : (
        <Link
          to={to}
          preventScrollReset={preventScrollReset}
          reloadDocument={reloadDocument}
          className={`${className}${getLinkTypeStyle(type)}${getDisabledStyle(
            disabled
          )}${getLinkBaseFontSizeStyle(size)}`}
        >
          {children}
        </Link>
      )}
    </>
  );
};

/**
 *
 * @param type
 * @returns
 */
const getLinkTypeStyle = (type: ConfigObject["type"]): string => {
  switch (type) {
    case "primary":
      return " text-purple-600 hover:text-purple-800";
    case "secondary":
      return " text-gray-600 hover:text-gray-700";
    default:
      return "";
  }
};

/**
 *
 * @param size
 * @returns
 */
const getLinkBaseFontSizeStyle = (size: ConfigObject["size"]) => {
  switch (size) {
    case "sm":
      return " text-sm";
    case "md":
      return " text-base";
    case "lg":
      return " text-lg";
    default:
      return "";
  }
};

const getDisabledStyle = (disabled: ConfigObject["disabled"]) => {
  switch (disabled) {
    case true:
      return " text-gray-300 pointer-events-none";
    default:
      return "";
  }
};

export { LinkComponent };
