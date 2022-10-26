import { FunctionComponent } from "react";

type ImageType = "rounded" | "circle";

/**
 * Defines the type of configuration object
 * that can be passed to ImageComponent.
 */
type ConfigObject = {
  className?: string;
  style?: React.CSSProperties;
  type?: ImageType;
  src?: string;
  alt?: string;
};

/**
 * Configurable Image component.
 *
 * @example
 * Here's a simple example:
 * ```
 * import React from "react";
 * import { ImageComponent } from "@nebulr-group/nblocks-react";
 * import image from "../assets/image.jpg";
 *
 * const MyComponent = () => {
 *  return (
 *    <>
 *      <ImageComponent src={image} alt={"Image example."} />
 *    </>
 *  );
 * };
 * ```
 * @param param0
 * @returns The responsive image component.
 */
const ImageComponent: FunctionComponent<ConfigObject> = ({
  src,
  alt,
  className,
  type,
  style,
}) => {
  className = className ? className : "";
  return (
    <img
      src={src}
      alt={alt}
      className={`${className}${getImageTypeStyle(type)}`}
      style={style}
    />
  );
};

/**
 *
 * @param type
 * @returns
 */
const getImageTypeStyle = (type: ConfigObject["type"]) => {
  switch (type) {
    case "rounded":
      return ` rounded-md h-full`;
    case "circle":
      return ` rounded-full h-full`;
    default:
      return " h-full";
  }
};

export { ImageComponent };
