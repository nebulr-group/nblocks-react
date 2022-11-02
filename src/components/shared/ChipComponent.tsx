import React, { FunctionComponent } from "react";
import { ImageComponent } from "./ImageComponent";

type ConfigObject = {
  children?: React.ReactNode;
  type?: "primary" | "success" | "tertiary";
  className?: string;
  icon?: React.ReactNode;
};

const ChipComponent: FunctionComponent<ConfigObject> = ({
  children,
  type,
  icon,
  className,
}) => {
  className = className ? className : "";
  const getChipIcon = (icon: React.ReactNode) => {
    if (typeof icon === "string") {
      return <ImageComponent src={icon} />;
    } else {
      return <>{icon}</>;
    }
  };
  return (
    <div className={`${className}${getChipStyle(type)}`}>
      {icon && getChipIcon(icon)}
      {children}
    </div>
  );
};

const getChipStyle = (type: ConfigObject["type"]) => {
  switch (type) {
    case "primary":
      return " bg-purple-100 rounded-2xl px-2 py-0.5 font-medium text-purple-700 inline-flex items-center";
    case "tertiary":
      return " bg-gray-100 rounded-2xl px-2 py-0.5 font-medium text-gray-700 flex inline-flex items-center";
    case "success":
      return " bg-green-100 rounded-2xl px-2 py-0.5 font-medium text-green-700 flex inline-flex items-center";
    default:
      return "";
  }
};

export { ChipComponent };
