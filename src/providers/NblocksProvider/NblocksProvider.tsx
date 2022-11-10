import React, { FunctionComponent } from "react";
import { NblocksAppContextProvider } from "../../hooks/app-context";
import { NblocksAuthContextProvider } from "../../hooks/auth-context";
import {
  LangOverrideParam,
  NblocksThemeContextProvider,
} from "../../hooks/theme-context";
import { NblocksSecureContextProvider } from "../../hooks/secure-http-context";
import { BrandingConfig, ColorConfig } from "../../utils/BrandingConfig";
import {
  NblocksConfigContextProvider,
  useConfig,
} from "../../hooks/config-context";
import { LibConfig } from "../../models/lib-config";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthGuard } from "../../routes/AuthGuard";
import { AuthRoutes } from "../../routes/AuthRoutes";
import { OnboardRoutes } from "../../routes/OnboardRoutes";
import { SetupRoutes } from "../../routes/SetupRoutes";
import { UserRoutes } from "../../routes/UserRoutes";

/**
 * Wrap your code into this Provider to get access to the Nblocks world
 * @param param0
 * @returns
 */
const NblocksProvider: FunctionComponent<{
  config?: Partial<LibConfig>;
  i18nOverrides?: LangOverrideParam[];
  styleOverrides?: Partial<BrandingConfig>;
  colorOverrides?: Partial<ColorConfig>;
  children: JSX.Element;
}> = ({ children, config, i18nOverrides, styleOverrides, colorOverrides }) => {
  // Children.map(children, (child, index) => {
  //   console.log(child.type.toString());
  // });

  console.log("Nblocks: Beta");

  return (
    <NblocksConfigContextProvider config={config}>
      <NblocksSecureContextProvider>
        <NblocksAuthContextProvider>
          <NblocksAppContextProvider>
            <NblocksThemeContextProvider
              i18nOverrides={i18nOverrides}
              styleOverrides={styleOverrides}
              colorOverrides={colorOverrides}
            >
              <DevRouterWrapper>{children}</DevRouterWrapper>
            </NblocksThemeContextProvider>
          </NblocksAppContextProvider>
        </NblocksAuthContextProvider>
      </NblocksSecureContextProvider>
    </NblocksConfigContextProvider>
  );
};

/**
 * The DevRouterWrapper defines a new BrowserRouter if `config.spa == true` otherwise it's up to the developer to setup routes
 * In Spa mode, the children will be restricted using AuthGuard
 * @returns
 */
const DevRouterWrapper: FunctionComponent<{
  children: JSX.Element;
}> = ({ children }) => {
  const { debug, spa } = useConfig();

  if (spa) {
    if (debug) {
      console.log("DevRouterWrapper: Resorting to built-in Routing");
    }
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/onboard/*" element={<OnboardRoutes />} />
          <Route path="/setup/*" element={<SetupRoutes />} />
          <Route
            path="/user/*"
            element={
              <AuthGuard>
                <UserRoutes />
              </AuthGuard>
            }
          />
          <Route path="/" element={<AuthGuard>{children}</AuthGuard>} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return children;
  }
};

export { NblocksProvider };
