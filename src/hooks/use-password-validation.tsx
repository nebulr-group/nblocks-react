import { Dispatch, SetStateAction, useState } from "react";

// Configuration type
export type Config = {
  messages: {
    onEmptyString: string;
    onMinLenght: string;
    onNoUppercaseLetter: string;
    onNoLowercaseLetter: string;
    onNoNumber: string;
    onNoSpecialCharacter: string;
    onInvalidCustomStrenght: string;
  };
};
// Password Validation Fedback Log Format
export interface PasswordValidationPropmtMessage {
  error?: string;
}

// Password Validation Hook Type
type PasswordValidationHook = (config?: Config) => {
  passwordIsValid: boolean;
  feedbackLog: PasswordValidationPropmtMessage[];
  password: string;
  onPasswordTextChangeValidation: (
    text: string,
    regex?: RegExp,
    skipValidation?: boolean
  ) => void;
  onResetPasswordInputText: () => void;
  setPassword: Dispatch<SetStateAction<string>>;
};

const usePasswordValidation: PasswordValidationHook = (config) => {
  // Password Text State
  const [password, setPassword] = useState("");
  const [feedbackLog, setFeedbackLog] = useState<
    PasswordValidationPropmtMessage[]
  >([{}]);

  // Default Hook Validation Configuration
  const defaultConfig = {
    messages: {
      onEmptyString: "Password field can not be empty.",
      onMinLenght: "Minimal length: 10 characters",
      onNoUppercaseLetter: "Should contain uppercase letter",
      onNoLowercaseLetter: "Should contain lowercase letter",
      onNoNumber: "Should contain digit",
      onNoSpecialCharacter: "Should contain special character",
      onInvalidCustomStrenght: "The password must be hard to guess!",
    },
  };

  // Custom and Default Configuration Union

  let validationConfiguration = {
    ...defaultConfig,
    messages: {
      ...defaultConfig.messages,
    },
  };

  if (config) {
    validationConfiguration = {
      ...defaultConfig,
      ...config,
      messages: {
        ...defaultConfig.messages,
        ...config.messages,
      },
    };
  }

  // Reset password field text
  const onResetPasswordInputText = () => {
    setPassword("");
  };

  const onPasswordTextChangeValidation = (
    text: string,
    regex?: RegExp,
    skipValidation?: boolean
  ) => {
    if (text === "") {
      // If password is an empty string
      setFeedbackLog([
        {
          error: validationConfiguration.messages.onEmptyString,
        },
      ]);
      setPassword("");
      return;
    }

    if (skipValidation) {
      setFeedbackLog([]);
      setPassword(text);
      return;
    }

    // If using custom regex
    if (regex) {
      const passwordErrors = passwordCustomStrengthValidator(regex, text);
      const errorMessageLog = [];
      if (passwordErrors.passwordStrenght_invalidCustomStrenght) {
        errorMessageLog.push({
          error: validationConfiguration.messages.onInvalidCustomStrenght,
        });
      }
      setFeedbackLog(errorMessageLog);
      setPassword(text);
      return;
    }

    const passwordErrors = passwordStandardStrengthValidator(text);
    const errorMessageLog = [];
    // Min lenght
    if (passwordErrors.passwordStrength_minLength) {
      errorMessageLog.push({
        error: validationConfiguration.messages.onMinLenght,
      });
    }

    if (passwordErrors.passwordStrength_noUppercaseLetter) {
      errorMessageLog.push({
        error: validationConfiguration.messages.onNoUppercaseLetter,
      });
    }

    if (passwordErrors.passwordStrength_noLowercaseLetter) {
      errorMessageLog.push({
        error: validationConfiguration.messages.onNoLowercaseLetter,
      });
    }

    if (passwordErrors.passwordStrength_noNumber) {
      errorMessageLog.push({
        error: validationConfiguration.messages.onNoNumber,
      });
    }

    if (passwordErrors.passwordStrength_noSpecialCharacter) {
      errorMessageLog.push({
        error: validationConfiguration.messages.onNoSpecialCharacter,
      });
    }

    setFeedbackLog(errorMessageLog);
    setPassword(text);
    return;
  };

  const passwordIsValid = feedbackLog.length > 0 ? false : true;
  return {
    password,
    feedbackLog,
    passwordIsValid,
    onPasswordTextChangeValidation,
    onResetPasswordInputText,
    setPassword,
  };
};

// ISO 27001 strength
const passwordStandardStrengthValidator = (value: string) => {
  const errors = {
    passwordStrength: false,
    passwordStrength_minLength: false,
    passwordStrength_noUppercaseLetter: false,
    passwordStrength_noLowercaseLetter: false,
    passwordStrength_noNumber: false,
    passwordStrength_noSpecialCharacter: false,
  };

  if (value.length < 10) {
    errors.passwordStrength = true;
    errors.passwordStrength_minLength = true;
  }

  const upperCaseCharacters = /[A-Z]+/g;
  if (upperCaseCharacters.test(value) === false) {
    errors.passwordStrength = true;
    errors.passwordStrength_noUppercaseLetter = true;
  }

  const lowerCaseCharacters = /[a-z]+/g;
  if (lowerCaseCharacters.test(value) === false) {
    errors.passwordStrength = true;
    errors.passwordStrength_noLowercaseLetter = true;
  }

  const numberCharacters = /[0-9]+/g;
  if (numberCharacters.test(value) === false) {
    errors.passwordStrength = true;
    errors.passwordStrength_noNumber = true;
  }

  const specialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
  if (specialCharacters.test(value) === false) {
    errors.passwordStrength = true;
    errors.passwordStrength_noSpecialCharacter = true;
  }

  return errors;
};

// Uses custom regex to validate the password value
const passwordCustomStrengthValidator = (regex: RegExp, value: string) => {
  const errors = {
    passwordStrenght: false,
    passwordStrenght_invalidCustomStrenght: false,
  };

  if (regex.test(value) === false) {
    errors.passwordStrenght = true;
    errors.passwordStrenght_invalidCustomStrenght = true;
  }

  return errors;
};

export { usePasswordValidation };
