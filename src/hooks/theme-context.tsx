import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./auth-context";
import {
  defaultBranding,
  BrandingConfig,
  defaultColor,
  ColorConfig,
} from "../utils/BrandingConfig";
import { useConfig } from "./config-context";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../translations/en.json";

const initialContext = {
  locale: "",
  styles: defaultBranding,
  colors: defaultColor,
};
const Context = React.createContext(initialContext);
const useTheme = () => useContext(Context);

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export type LangOverrideParam = { lang: string; resources: any };

const NblocksThemeContextProvider: FunctionComponent<{
  i18nOverrides?: LangOverrideParam[];
  styleOverrides?: Partial<BrandingConfig>;
  colorOverrides?: Partial<ColorConfig>;
  children: React.ReactNode;
}> = ({ children, i18nOverrides, styleOverrides, colorOverrides }) => {
  const { defaultLocale } = useConfig();
  const { currentUser } = useAuth();
  const [locale, setLocale] = useState(initialContext.locale);
  const [styles, setStyles] = useState(initialContext.styles);
  const [colors, setColors] = useState(initialContext.colors);

  useEffect(() => {
    setStyles({ ...defaultBranding, ...styleOverrides });
  }, [styleOverrides]);

  useEffect(() => {
    setColors({ ...defaultColor, ...colorOverrides });
  }, [styleOverrides]);

  useEffect(() => {
    i18nOverrides?.map((langOverride) =>
      i18n.addResourceBundle(
        langOverride.lang,
        "translation",
        langOverride.resources,
        true,
        true
      )
    );
    if (locale) {
      i18n.changeLanguage(locale);
    }
  }, [i18nOverrides]);

  useEffect(() => {
    setLocale(defaultLocale);
  }, [defaultLocale]);

  useEffect(() => {
    if (currentUser.user?.tenant) setLocale(currentUser.user?.tenant.locale);
  }, [currentUser]);

  return (
    <Context.Provider
      value={{ ...initialContext, ...{ locale, styles, colors } }}
    >
      {children}
    </Context.Provider>
  );
};

export { NblocksThemeContextProvider, useTheme };
