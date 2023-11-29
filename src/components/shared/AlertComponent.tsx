import React, { FunctionComponent } from "react";
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import { classNameFilter } from "../../utils/ComponentHelpers";
import { TextComponent } from "./TextComponent";
import { XCircleIcon } from "@heroicons/react/24/outline";

export type ComponentProps = {
  title: string;
  messages: string[];
  closable?: boolean;
  onCloseClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
  type?: "primary" | "secondary" | "success" | "warning" | "danger";
};

const AlertComponent: FunctionComponent<ComponentProps> = ({
  title,
  messages,
  type,
  className,
  closable,
  onCloseClick,
}) => {
  return (
    <div className={classNameFilter(className, getContainerStyle(type))}>
      <div className="flex relative">
        <div className="flex-shrink-0">{renderTypeIcon(type)}</div>
        <div className="ml-3">
          <TextComponent
            size="sm"
            colorName={getTextColor(type)}
            className="font-semibold"
            customizableClass={false}
          >
            {title}
          </TextComponent>
          <div className="">
            {messages.map((message, i) => (
              <TextComponent
                key={i}
                size="sm"
                colorName={getTextColor(type)}
                customizableClass={false}
              >
                {message}
              </TextComponent>
            ))}
          </div>
        </div>
        {closable && (
          <div
            className="absolute right-0 h-5 w-5 cursor-pointer"
            onClick={onCloseClick}
          >
            <XCircleIcon className={classNameFilter(getIconStyle(type))} />
          </div>
        )}
      </div>
    </div>
  );
};

const getContainerStyle = (type: string | null = null) => {
  const baseStyle = "rounded-md p-4";
  switch (type) {
    case "primary":
      return ` bg-purple-50 ${baseStyle}`;
    case "secondary":
      return ` bg-gray-50 ${baseStyle}`;
    case "danger":
      return ` bg-red-50 ${baseStyle}`;
    case "warning":
      return ` bg-yellow-50 ${baseStyle}`;
    case "success":
      return ` bg-green-50 ${baseStyle}`;
    default:
      return ` bg-purple-50 ${baseStyle}`;
  }
};

const getIconStyle = (type: ComponentProps["type"]) => {
  switch (type) {
    case "danger":
      return "text-red-500";
    case "primary":
      return "text-purple-500";
    case "secondary":
      return "text-gray-500";
    case "success":
      return "text-green-500";
    case "warning":
      return "text-orange-500";
    default:
      return "text-purple-500";
  }
};

const getTextColor = (type: string | null = null) => {
  switch (type) {
    case "primary":
      return `text-purple-700`;
    case "secondary":
      return `text-gray-600`;
    case "danger":
      return `text-red-700`;
    case "warning":
      return `text-yellow-700`;
    case "success":
      return `text-green-700`;
    default:
      return `text-purple-700`;
  }
};

const renderTypeIcon = (type: string | null = null) => {
  const baseStyle = "h-5 w-5";
  switch (type) {
    case "primary":
      return (
        <InformationCircleIcon className={`text-purple-600 ${baseStyle}`} />
      );
    case "secondary":
      return <InformationCircleIcon className={`text-gray-600 ${baseStyle}`} />;
    case "danger":
      return <ExclamationCircleIcon className={`text-red-600 ${baseStyle}`} />;
    case "warning":
      return (
        <ExclamationTriangleIcon className={`text-yellow-600 ${baseStyle}`} />
      );
    case "success":
      return <CheckCircleIcon className={`text-green-600 ${baseStyle}`} />;
    default:
      return (
        <InformationCircleIcon className={`text-purple-600 ${baseStyle}`} />
      );
  }
};

export { AlertComponent };
