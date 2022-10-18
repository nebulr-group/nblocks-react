import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { useApp } from "./app-context";
import { useAuth } from "./auth-context";
//import i18n from "i18next";
//import { initReactI18next } from "react-i18next";
import { defaultBranding, BrandingConfig, defaultColor, ColorConfig } from "../utils/BrandingConfig";

const initialContext = {locale:"", styles: defaultBranding, colors: defaultColor};
const Context = React.createContext(initialContext);
const useTheme = () => useContext(Context);

// const initI18n = () => {
//   i18n
//   .use(initReactI18next) // passes i18n down to react-i18next
//   .init({
//     // the translations
//     // (tip move them in a JSON file and import them,
//     // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
//     resources: {
//       en: {
//         nblocks: {
//           "LOGIN": "Sign in",
//           "FORGOT_PASSWORD": "Forgot password?"
//         }
//       },
//       sv: {
//         nblocks: {
//           "LOGIN": "Logga in",
//           "FORGOT_PASSWORD": "Glömt lösenord?"
//         }
//       }
//     },
//     lng: "en", // if you're using a language detector, do not define the lng option
//     fallbackLng: "en",

//     interpolation: {
//       escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
//     }
//   });
// }

//initI18n();

export type LangOverrideParam = {lang: string, resources: any};

const NblocksThemeContextProvider: FunctionComponent<{
  i18nOverrides?: LangOverrideParam[];
  styleOverrides?: Partial<BrandingConfig>;
  colorOverrides?: Partial<ColorConfig>;
  children: React.ReactNode;
}> = ({children, i18nOverrides, styleOverrides, colorOverrides}) => {
  
  const {defaultLocale} = useApp();
  const {currentUser} = useAuth();
  const [locale, setLocale] = useState(initialContext.locale);
  const [styles, setStyles] = useState(initialContext.styles);
  const [colors, setColors] = useState(initialContext.colors);

  useEffect(() => {
    setStyles({...defaultBranding, ...styleOverrides});
  }, [styleOverrides]);

  useEffect(() => {
    setColors({...defaultColor, ...colorOverrides});
  }, [styleOverrides]);

  // useEffect(() => {
  //   i18nOverrides?.map(
  //     langOverride => i18n.addResourceBundle(langOverride.lang, 'nblocks', langOverride.resources, true, true));
  //   if (locale) {
  //     i18n.changeLanguage(locale);
  //   }
  // });

  useEffect(() => { 
      setLocale(defaultLocale);
  }, [defaultLocale])

  useEffect(() => {
    if (currentUser.user?.tenant)
      setLocale(currentUser.user?.tenant.locale)
  }, [currentUser])

    return (
      <Context.Provider value={{...initialContext,...{locale, styles, colors}}}>
        {children}
      </Context.Provider>
    );
}

export {NblocksThemeContextProvider, useTheme};