import { FunctionComponent, useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { TextComponent } from "./TextComponent";

type Option = {
  /** The value. Must be unique */
  value: string;
  /** Displayed label */
  label: string;
  /** Displayed icon on the left side of label and description */
  icon?: React.ReactNode;
  /** Displayed sub label */
  description?: string;
};

type ConfigObject = {
  /** Default value for preselecting. If undefined the first option will be selected */
  defaultValue?: Option;
  /** All the options */
  options: Option[];
  /** Title shown on top of the component */
  title?: string;
  /** Callback when an option has been selected */
  didSelectOption: (option: Option) => void;
};

const RadioGroupComponent: FunctionComponent<ConfigObject> = ({
  defaultValue,
  options,
  didSelectOption,
  title,
}) => {
  const [selected, setSelected] = useState(
    defaultValue ? defaultValue : options[0]
  );
  const [
    haveNotifiedAboutDefaultFallback,
    sethaveNotifiedAboutDefaultFallback,
  ] = useState(false);

  const onChange = (value: Option) => {
    setSelected(value);
    didSelectOption(value);
  };

  useEffect(() => {
    if (!defaultValue && !haveNotifiedAboutDefaultFallback) {
      didSelectOption(selected);
      sethaveNotifiedAboutDefaultFallback(true);
    }
  }, []);

  return (
    <div>
      <div>
        <RadioGroup
          value={selected}
          by="value"
          onChange={(val: Option) => onChange(val)}
        >
          <RadioGroup.Label>{title}</RadioGroup.Label>
          <div className="space-y-2 py-2">
            {options.map((option, i) => {
              return <RadioGroupOptionComponent option={option} key={i} />;
            })}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

const RadioGroupOptionComponent: FunctionComponent<{
  option: Option;
}> = ({ option }) => {
  return (
    <RadioGroup.Option
      value={option}
      className={({ active, checked }) =>
        `
                  ${
                    checked
                      ? "ring-2 ring-purple-700 bg-purple-50"
                      : "ring-1 ring-gray-200 hover:ring-2 hover:ring-purple-300"
                  }
                    relative flex cursor-pointer rounded-lg px-4 py-4 focus:outline-none`
      }
    >
      {({ active, checked }) => (
        <>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              {option.icon}
              <div className="pl-3">
                <RadioGroup.Label>
                  <TextComponent>{option.label}</TextComponent>
                </RadioGroup.Label>
                <RadioGroup.Description as="span">
                  <TextComponent size="sm">{option.description}</TextComponent>
                </RadioGroup.Description>
              </div>
            </div>
            {checked && (
              <div className="shrink-0 text-purple-600">
                <CheckCircleIcon className="h-6 w-6" />
              </div>
            )}
          </div>
        </>
      )}
    </RadioGroup.Option>
  );
};

export { RadioGroupComponent };
export type { Option };
