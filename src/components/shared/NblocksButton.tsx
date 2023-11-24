import React, { FunctionComponent, ReactNode } from "react";
import { Transition } from "@headlessui/react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { classNameFilter } from "../../utils/ComponentHelpers";

/**
 * Object type with specific fields for type checking props that are passed to NblocksButton.
 *
 */
type ConfigObject = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onClickCapture?: React.MouseEventHandler<HTMLButtonElement>;
  type?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "warning"
    | "danger";
  isLoading?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  submit?: boolean;
  disabled?: boolean;
  children: ReactNode;
  /**Allows the button to take full width. This overrides the width constraints for `size`*/
  fullWidth?: boolean;
  className?: string;
};

/**
 * Returns customizable button component.
 *
 * @remarks
 * This function component returns a fully reusable and flexible button component, that you can configure to your liking.
 *
 * @example
 * ```
 * import { FunctionComponent } from "react";
 * import { NblocksButton } from "@nebulr-group/nblocks-react";
 *
 * const Container: FunctionComponent<ConfigObject> = () => {
 *  return (
 *    <div>
 *      <NblocksButton
 *        type="primary"
 *        size="xl"
 *        disabled={false}
 *        onClick={() => console.log("Hello World!")}
 *      >
 *        Button
 *      </NblocksButton>
 *    </div>
 *  );
 * }
 * ```
 * @typeParam param0 - must be of type ConfigObject
 * @param param0
 * @returns The flexible button component.
 */
const NblocksButton: FunctionComponent<ConfigObject> = ({
  onClick,
  onClickCapture,
  type,
  className = "",
  submit,
  size,
  disabled,
  children,
  fullWidth,
  isLoading,
}) => {
  const buttonTypeStyle = getButtonTypeStyle(type);
  const buttonPadding = getPadding(size);
  return (
    <button
      className={classNameFilter(
        className,
        buttonTypeStyle,
        buttonPadding,
        `${fullWidth ? " w-full" : ""}`,
        "flex items-center justify-center customizable"
      )}
      disabled={disabled}
      onClick={onClick}
      onClickCapture={onClickCapture}
      type={submit ? "submit" : "button"}
    >
      {isLoading !== undefined && (
        <Transition show={isLoading}>
          <ArrowPathIcon className="animate-spin h-5 mr-2" />
        </Transition>
      )}
      {children}
    </button>
  );
};

/**
 * Returns string containg the set of classes that corespond to the given type of button.
 * @param type - The type of button for which you want function to return classes.
 * @returns The string containing set of classes for the given type of the button.
 */
const getButtonTypeStyle = (type: string | null = null) => {
  const baseStyle = "rounded-md font-semibold";
  switch (type) {
    case "primary":
      return ` bg-purple-500 hover:bg-purple-600 active:text-purple-200 text-white disabled:text-white disabled:bg-purple-300 ${baseStyle}`;
    case "secondary":
      return ` bg-purple-200 text-purple-500 hover:bg-purple-500 hover:text-purple-300 active:text-purple-600 active:bg-purple-200 disabled:text-purple-300 disabled:bg-purple-200 ${baseStyle}`;
    case "tertiary":
      return ` bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 active:text-gray-500 disabled:text-gray-400 ${baseStyle}`;
    case "success":
      return ` bg-green-500 text-white hover:bg-green-600 active:text-green-200 disabled:text-white disabled:bg-green-200 ${baseStyle}`;
    case "warning":
      return ` bg-yellow-400 text-white hover:bg-yellow-500 active:text-yellow-100 disabled:bg-yellow-200 ${baseStyle}`;
    case "danger":
      return ` bg-red-600 text-white hover:bg-red-700 active:text-red-200 disabled:bg-red-300 ${baseStyle}`;
    default:
      return "";
  }
};

/**
 * Returns string containing the set of classes that corespond to the given size of button.
 *
 * @param size - The size of button for which you want function to return classes.
 * @returns The string containing set of classes for the given size of the button.
 */
const getPadding = (size: string | null = null) => {
  switch (size) {
    case "sm":
      return " px-8 py-1.5";
    case "md":
      return " px-8 py-2";
    case "lg":
      return " px-8 py-2.5";
    case "xl":
      return " px-8 py-3";
    case "2xl":
      return " px-8 py-4";
    default:
      return "";
  }
};

export { NblocksButton };
