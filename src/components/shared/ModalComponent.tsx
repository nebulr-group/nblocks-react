import React, { Fragment, FunctionComponent } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ImageComponent } from "./ImageComponent";
import { HeadingComponent } from "./HeadingComponent";
import { TextComponent } from "./TextComponent";

/**
 * Defines the type of configuration object
 * that can be passed to ModalComponent.
 *
 */
type ConfigObject = {
  isOpen: boolean;
  children?: React.ReactNode;
  heading?: string;
  icon?: React.ReactNode;
  iconType?: "primary" | "danger" | "warning" | "success" | "info";
  iconClassName?: string;
  overlayClassName?: string;
  description?: string;
  width?:
    | "md"
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
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Returns configurable ModalComponent.
 *
 * @example
 * Here's a simple example:
 * ```
 * import React, { useState } from "react";
 * import { ModalComponent, NblocksButton } from "@nebulr-group/nblocks-react";
 * import { svgIcon } from "../assets/svgIcon.svg";
 *
 *
 * const MyComponent = () => {
 *  // Modal open state
 *  const [ isOpen, setIsOpen ] = useState(false);
 *
 *  return (
 *   <ModalComponent
 *    isOpen={isOpen}
 *    setIsOpen={setIsOpen}
 *    heading={"Modal's Example Title!"}
 *    description={"Modal's example description."}
 *    icon={svgIcon}
 *    >
 *        <NblocksButton
 *          size="md"
 *          type="tertiary"
 *          onClick={() => setIsOpen(false)}
 *        >
 *          Cancel
 *        </NblocksButton>
 *        <NblocksButton
 *          size="md"
 *          type="primary"
 *          onClick={() => {
 *            alert("Saved!");
 *            setIsOpen(false);
 *          }}
 *         >
 *          Save changes
 *         </NblocksButton>
 *   </ModalComponent>
 *  );
 * };
 * ```
 *
 * @param param0
 * @returns
 */
const ModalComponent: FunctionComponent<ConfigObject> = ({
  isOpen,
  children,
  heading,
  description,
  icon,
  iconClassName,
  iconType,
  setIsOpen,
  width,
  overlayClassName,
}) => {
  iconClassName = iconClassName ? iconClassName : "";

  const getModalIcon = (icon: React.ReactNode) => {
    if (typeof icon === "string") {
      return (
        <ImageComponent
          src={icon}
          className={`${iconClassName}${getIconTypeStyle(iconType)}`}
        />
      );
    } else {
      return (
        <div className={`${iconClassName}${getIconTypeStyle(iconType)}`}>
          {icon}
        </div>
      );
    }
  };

  const getMaxWidthClassName = () => {
    return `max-w-${width ? width : "md"}`;
  };

  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <Dialog
        onClose={() => setIsOpen(false)}
        className="fixed flex justify-center items-center inset-0 overflow-y-auto"
      >
        <Dialog.Overlay
          className={`fixed inset-0 bg-gray-400/30 ${
            overlayClassName ? overlayClassName : ""
          }`}
        />
        <Dialog.Panel
          className={`relative w-full p-4 md:p-6 ${getMaxWidthClassName()} bg-white rounded-lg z-50`}
        >
          <div
            className={`flex ${icon ? "justify-between" : "justify-end"} p-0`}
          >
            {icon && (
              <div
                className={`border-8 w-14 h-14 rounded-full flex justify-center items-center${getIconBackgroundTypeStyle(
                  iconType
                )}`}
              >
                {getModalIcon(icon)}
              </div>
            )}
          </div>

          <div className="mt-5">
            {heading && (
              <HeadingComponent size="lg" type="h2" className="font-semibold">
                {heading}
              </HeadingComponent>
            )}
            {description && (
              <TextComponent size="sm" className="mt-2 text-slate-900">
                {description}
              </TextComponent>
            )}
            {children && <div className="mt-2">{children}</div>}
          </div>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
};

/**
 *
 * @param imageType
 * @returns
 */
const getIconBackgroundTypeStyle = (iconType: ConfigObject["iconType"]) => {
  switch (iconType) {
    case "danger":
      return " bg-red-200 border-red-100";
    case "success":
      return " bg-green-200 border-green-100";
    case "warning":
      return " bg-yellow-200 border-yellow-100";
    case "primary":
      return " bg-purple-200 border-purple-100";
    case "info":
      return " bg-blue-200 border-blue-100";
    default:
      return " bg-purple-200 border-purple-100";
  }
};

const getIconTypeStyle = (iconType: ConfigObject["iconType"]) => {
  switch (iconType) {
    case "danger":
      return " text-red-600 h-5 w-5";
    case "success":
      return " text-green-600 h-5 w-5";
    case "warning":
      return " text-yellow-600 h-5 w-5";
    case "primary":
      return " text-purple-600 h-5 w-5";
    case "info":
      return " text-blue-600 h-5 w-5";
    default:
      return " text-purple-600 h-5 w-5";
  }
};

export { ModalComponent };
