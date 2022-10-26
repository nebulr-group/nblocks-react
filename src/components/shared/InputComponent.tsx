import { ChangeEvent, FunctionComponent, ReactNode } from "react";
// When updating/extending this reusable input component
// please reference the official html input specification:
// https://html.spec.whatwg.org/multipage/input.html

/**
 * Defines current supported input types by InputComponent.
 */
type InputType = "text" | "password" | "email" | "number" | "tel" | "username";

/**
 * Defines the label type.
 *
 * @beta
 */
type LabelType = {
  position: "left" | "right";
  src: string;
  srcset?: string;
  alt: string;
};

/**
 * Defines the type of configuration object
 * that can be passed to InputComponent.
 */
type ConfigObject = {
  className?: string | undefined;
  type: InputType;
  label?: string;
  labelClassName?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean | undefined;
  caption?: ReactNode;
  infoLabel?: LabelType;
  errorLabel?: LabelType;
  min?: string | number;
  max?: number | string | undefined;
  maxLength?: number | undefined;
  minLength?: number | undefined;
  size?: number | undefined;
  list?: string | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
  inputError?: boolean | undefined;
  onSuccessValidation?: boolean | undefined;
  ref?: React.LegacyRef<HTMLInputElement>;

  onChange?: (event: ChangeEvent<HTMLInputElement>) => any | undefined;
};

/**
 * Returns configurable InputComponent to which you can pass configuration.
 *
 * @example
 * Here's a simple example:
 * ```
 * import React, { Fragment } from "react";
 * import { InputComponent } from "@nebulr-group/nblocks-react";
 *
 *
 * const MyComponent = () => {
 *  // onChange Event handlers
 *  const onEmailChange = (event) => {
 *    console.log(event.target.value);
 *  };
 *
 *  const onPasswordChange = (event) => {
 *    console.log(event.target.value);
 *  };
 *
 *  return (
 *    <Fragment>
 *      <InputComponent
 *        type={"email"}
 *        name={"email"}
 *        label={"Email address"}
 *        required={true}
 *        placeholder={"john@doe.com"}
 *        onChange={onEmailChange}
 *      />
 *      <InputComponent
 *        type={"password"}
 *        name={"password"}
 *        label={"Password"}
 *        required={true}
 *        placeholder={"Please, enter your password."}
 *        onChange={onPasswordChange}
 *      />
 *    </Fragment>
 *  );
 * };
 * ```
 *
 * @param param0
 * @returns The ReactNode containing input component with optional label, validation and caption.
 */
const InputComponent: FunctionComponent<ConfigObject> = ({
  type,
  label,
  labelClassName,
  name,
  placeholder,
  disabled,
  required,
  readonly,
  caption,
  infoLabel,
  errorLabel,
  min,
  max,
  maxLength,
  minLength,
  size,
  list,
  value,
  inputError,
  onSuccessValidation,
  className,
  ref,
  onChange,
}) => {
  labelClassName = labelClassName ? labelClassName : "";
  className = className ? className : "";
  const getIcon = () => {
    if (inputError && errorLabel) {
      return (
        <div
          className={
            "flex items-center absolute" +
            getIconPositionStyle(errorLabel.position)
          }
        >
          <img
            src={errorLabel.src}
            alt={errorLabel.alt}
            srcSet={errorLabel.srcset}
          />
        </div>
      );
    } else if ((!inputError || inputError === undefined) && infoLabel) {
      return (
        <div
          className={
            "flex items-center absolute" +
            getIconPositionStyle(infoLabel.position)
          }
        >
          <img
            src={infoLabel.src}
            alt={infoLabel.alt}
            srcSet={infoLabel.srcset}
            className="fill-red-500"
          />
        </div>
      );
    } else {
      return;
    }
  };
  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className={`text-gray-900 mb-1 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <div className={`relative w-full ${className}`}>
        {getIcon()}
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          className={`box-border w-full shadow-sm placeholder:text-gray-500 py-3 border rounded-md disabled:bg-gray-50 ${getInputValidationStyle(
            inputError,
            onSuccessValidation
          )} ${
            inputError
              ? getInputPadding(errorLabel?.position)
              : getInputPadding(infoLabel?.position)
          }`}
          disabled={disabled}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          min={min}
          max={max}
          size={size}
          readOnly={readonly}
          list={list}
          value={value}
          ref={ref}
          onChange={(event) => (onChange ? onChange(event) : undefined)}
        />
      </div>
      {caption}
    </>
  );
};

/**
 *
 * @param inputError
 * @param onSuccessValidation
 * @returns
 */
const getInputValidationStyle = (
  inputError: ConfigObject["inputError"],
  onSuccessValidation: ConfigObject["onSuccessValidation"]
) => {
  if (inputError) {
    return "border-red-300 bg-white focus:outline-red-400 text-red-800 focus-visible:outline-red-400";
  } else if (!inputError && onSuccessValidation) {
    return "border-green-300 bg-white focus:outline-green-400 focus-visible:outline-green-400";
  }
  return "border-gray-300 bg-white focus:outline-purple-400 text-gray focus-visible:outline-purple-400";
};

/**
 *
 * @param position
 * @returns
 */
const getIconPositionStyle = (position: LabelType["position"]) => {
  switch (position) {
    case "left":
      return " inset-y-0 left-0 pl-3";
    case "right":
      return " inset-y-0 right-0 pr-3";
  }
};

/**
 *
 * @param position
 * @returns
 */
const getInputPadding = (position: LabelType["position"] | undefined) => {
  switch (position) {
    case "left":
      return "pl-8 pr-3";
    case "right":
      return "pr-8 pl-3";
    default:
      return "px-3";
  }
};

export { InputComponent };
