import React, { FunctionComponent } from "react";
import { Popover } from "@headlessui/react";
import { NblocksButton } from "./NblocksButton";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { ImageComponent } from "./ImageComponent";

/**
 * Defines the type of data object
 * that is used to create & configure button instance
 * in HorizontalEllipsisMenu component.
 */
export type Option = {
  /** Displayed label */
  label: string;
  /** Displayed position of the button label */
  labelPosition?: "left" | "center" | "right";
  /** Displayed icon on the left side of label and description */
  icon?: React.ReactNode;
  type?: "danger";
  /** Displayed sub label */
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

/**
 * Defines the type of configuration object
 * that can be passed to the HorizontalComponent.
 */
type ConfigObject = {
  options: Option[];
  position?: "left" | "right";
};

/**
 * Returns configurable HorizontalEllipsisMenu drop down overlay.
 *
 * @example
 * Here's a simple example:
 * ```
 * import React from "react";
 * import { HorizontalEllipsisMenu } from "@nebulr-group/nblocks-react";
 * import { svgIcon } from "../assets/svgIcon.svg";
 *
 * const MyComponent = () => {
 *  // Menu options config
 *  const options = [
 *    {
 *      label: "Option 1",
 *      icon: svgIcon,
 *      type: "danger",
 *      onClick: () => alert("Option 1 was clicked!"),
 *    },
 *    {
 *      label: "Option 2",
 *      onClick: () => alert("Option 2 was clicked!"),
 *    },
 *    {
 *      label: "Option 1",
 *      onClick: () => alert("Option 3 was clicked!"),
 *    }
 *  ];
 *
 *  return (
 *    <HorizontalEllipsisMenu options={options}/>
 *
 *  )
 * };
 *
 * ```
 *
 * @param param0
 * @returns The HorizontalEllipsisMenu component.
 */
const HorizontalEllipsisMenu: FunctionComponent<ConfigObject> = ({
  options,
  position,
}) => {
  const getButtonIcon = (icon: React.ReactNode) => {
    if (typeof icon === "string") {
      return (
        <div className={"w-6 h-6 mr-2 inline-block"}>
          <ImageComponent src={icon} />
        </div>
      );
    } else {
      return <div className={"w-6 h-6 mr-2 inline-block"}>{icon}</div>;
    }
  };
  return (
    <Popover className={"relative inline-flex"}>
      <Popover.Button className="w-6 h-6 outline-none my-auto">
        <EllipsisHorizontalIcon />
      </Popover.Button>
      <Popover.Panel
        className={`absolute bg-white text-gray-900 border rounded-lg z-50 p-2 min-h-max min-w-max${getPopoverPosition(
          position
        )}`}
      >
        <div className="flex flex-col w-full">
          {options.map((option, index) => {
            return (
              <NblocksButton
                key={index}
                onClick={option.onClick}
                className={`flex items-center w-full py-2 px-2 rounded-lg font-medium${getOptionStyle(
                  option.type
                )}${getOptionLabelPosition(option.labelPosition)}`}
              >
                {option.icon && getButtonIcon(option.icon)}
                {option.label}
              </NblocksButton>
            );
          })}
        </div>
      </Popover.Panel>
    </Popover>
  );
};

/**
 *
 * @param position
 * @returns
 */
const getOptionLabelPosition = (position: Option["labelPosition"]) => {
  switch (position) {
    case "left":
      return " justify-start";
    case "center":
      return " justify-center";
    case "right":
      return " justify-end";
    default:
      return " justify-left";
  }
};

/**
 *
 * @param type
 * @returns
 */
const getOptionStyle = (type: Option["type"]) => {
  switch (type) {
    case "danger":
      return " text-red-600 hover:bg-red-100";
    default:
      return " text-gray-700 hover:bg-gray-100";
  }
};

/**
 *
 * @param position
 * @returns
 */
const getPopoverPosition = (position: ConfigObject["position"]) => {
  switch (position) {
    case "left":
      return " right-0 origin-top-left inset-y-full";
    case "right":
      return " left-0 origin-top-right inset-y-full";
    default:
      return " left-0 origin-top-right inset-y-full";
  }
};

export { HorizontalEllipsisMenu };
