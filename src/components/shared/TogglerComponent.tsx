import React, { FunctionComponent } from "react";
// Open Source (MIT License) component library
import { Switch } from "@headlessui/react";

/**
 *
 */
type ConfigObject = {
  children?: React.ReactNode;
  className?: "";
  enabled: boolean;
  screenReaderText?: string;
  name?: string;
  value?: string;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 *
 * @param param0
 * @returns
 */
const TogglerComponent: FunctionComponent<ConfigObject> = ({
  children,
  className,
  enabled,
  name,
  value,
  screenReaderText,
  setEnabled,
}) => {
  className = className ? className : "";
  // Todo:
  // 1. Add on focus state style
  // 2. Add two different types of switch styling
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${className} relative inline-flex h-6 w-11 items-center ${
        enabled
          ? "bg-purple-600 hover:bg-purple-700"
          : "bg-gray-200 hover:bg-gray-300"
      } rounded-full`}
      name={name}
      value={value}
    >
      {screenReaderText && <span className="sr-only">{screenReaderText}</span>}
      <span
        className={`${
          enabled ? "translate-x-5" : "translate-x-0.5"
        } inline-block drop-shadow-lg h-5 w-5 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
};

export { TogglerComponent };
