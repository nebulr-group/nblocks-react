import React, { FunctionComponent, useEffect, useState } from "react";

interface CheckboxComponentProps {
  name: string;
  classNameCheckbox?: string;
  label: string;
  classNameLabel?: string;
  sublabel?: string;
  classNameSublabel?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const CheckboxComponent: FunctionComponent<CheckboxComponentProps> = ({
  name,
  classNameCheckbox,
  label,
  classNameLabel,
  sublabel,
  classNameSublabel,
  checked,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(!!checked);

  useEffect(() => {
    // Reset state if there's a change in the parent state`
    setIsChecked(!!checked);
  }, [checked]);

  const changeHandler = () => {
    setIsChecked(!isChecked);
    if (onChange) onChange(!isChecked);
  };

  return (
    <div className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          aria-describedby="comments-description"
          name={name}
          type="checkbox"
          className={`h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 ${classNameCheckbox}`}
          checked={isChecked}
          onChange={changeHandler}
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label
          htmlFor={name}
          className={`font-medium text-gray-900 ${classNameLabel}`}
        >
          {label}
        </label>{" "}
        <span className={`text-gray-500 ${classNameSublabel}`}>
          <span className="sr-only">{label} </span>
          {sublabel}
        </span>
      </div>
    </div>
  );
};

export { CheckboxComponent };
