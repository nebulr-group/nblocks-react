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
import { SpaRouter } from "../../routes/SpaRouter";
import { doLog } from "../../hooks/use-log";

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

  console.log(`Nblocks: Beta debug:${config?.debug}`);

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
              <ChildrenWrapper>{children}</ChildrenWrapper>
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
const ChildrenWrapper: FunctionComponent<{
  children: JSX.Element;
}> = ({ children }) => {
  const { debug, spa } = useConfig();

  if (spa) {
    if (debug) {
      doLog("DevRouterWrapper: Resorting to built-in Routing");
    }
    return <SpaRouter>{children}</SpaRouter>;
  } else {
    return children;
  }
};

export { NblocksProvider };
