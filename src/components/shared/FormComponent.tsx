import React, { FunctionComponent } from "react";

/**
 * Defines the supported configuration object type
 * for FormComponent.
 */
type ConfigObject = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  action?: string;
  legend?: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
};

/**
 * Configurable Form component.
 * @example
 * Here's a simple example:
 * ```
 * import React, { useState } from "react";
 * import { FormComponent, InputComponent, NblocksButton } from "@nebulr-group/nblocks-react";
 *
 * const MyComponent = () => {
 *  const [email, setEmail] = useState("");
 *  const [password, setPassword] = useState("");
 *
 *  const onFormSubmitHandler = (event) => {
 *    event.preventDefault();
 *    console.log(email);
 *    console.log(password);
 *  };
 *
 *  const onEmailChangeHandler = (event) => {
 *    setEmail(event.target.value);
 *  };
 *
 *  const onPasswordChangeHandler = (event) => {
 *    setPassword(event.target.value);
 *  };
 *
 *  return (
 *    <FormComponent onSubmit={onFormSubmitHandler}>
 *      <InputComponent
 *        type={"email"}
 *        name={"email"}
 *        label={"Email address"}
 *        required={true}
 *        placeholder={"john@doe.com"}
 *        onChange={onEmailChangeHandler}
 *      />
 *      <InputComponent
 *        type={"password"}
 *        name={"password"}
 *        label={"Password"}
 *        required={true}
 *        placeholder={"Please, enter your password."}
 *        onChange={onPasswordChangeHandler}
 *      />
 *      <NblocksButton type={"primary"} submit={true}>
 *    </FormComponent>
 *  );
 * };
 *
 * ```
 * @param param0
 * @returns The fully customizable html form element.
 */
const FormComponent: FunctionComponent<ConfigObject> = ({
  children,
  className,
  action,
  onSubmit,
}) => {
  className = className ? className : "";
  return (
    <form action={action} onSubmit={onSubmit} className={`${className}`}>
      {children}
    </form>
  );
};

export { FormComponent };
