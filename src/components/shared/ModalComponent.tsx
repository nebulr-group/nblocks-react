import { FunctionComponent } from "react";
import { Dialog } from "@headlessui/react";
import { ImageComponent } from "./ImageComponent";
import { HeadingComponent } from "./HeadingComponent";
import { TextComponent } from "./TextComponent";
import { NblocksButton } from "./NblocksButton";
import { XMarkIcon } from "@heroicons/react/24/solid";

/**
 * Defines the type of configuration object
 * that can be passed to ModalComponent.
 *
 */
type ConfigObject = {
  isOpen: boolean;
  children?: React.ReactNode;
  heading?: string;
  imageSrc?: string;
  imageType?: "primary" | "danger" | "warning" | "success" | "info";
  description?: string;
  imageClassName?: string;
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
 *    imageSrc={svgIcon}
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
  imageSrc,
  imageClassName,
  imageType,
  setIsOpen,
}) => {
  imageClassName = imageClassName ? imageClassName : "";
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed flex justify-center items-center inset-0 overflow-y-auto"
    >
      <Dialog.Overlay className={"fixed inset-0 bg-gray-400/30"} />
      <Dialog.Panel
        className={"relative w-full p-4 md:p-6 max-w-md bg-white rounded-lg"}
      >
        <div className="flex justify-between p-0">
          {imageSrc && (
            <div
              className={`border-8 w-14 h-14 rounded-full flex justify-center items-center${getImageTypeStyle(
                imageType
              )}`}
            >
              <div className="p-1">
                <ImageComponent
                  src={imageSrc}
                  className={`${imageClassName}`}
                />
              </div>
            </div>
          )}
          <NblocksButton
            onClick={() => {
              console.log("Hello");
              setIsOpen(false);
            }}
          >
            <XMarkIcon className="w-6 h-6" />
          </NblocksButton>
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
  );
};

/**
 *
 * @param imageType
 * @returns
 */
const getImageTypeStyle = (imageType: ConfigObject["imageType"]) => {
  switch (imageType) {
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

export { ModalComponent };
