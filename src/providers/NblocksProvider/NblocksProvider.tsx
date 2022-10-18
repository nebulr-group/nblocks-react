import React, { FunctionComponent } from 'react';
import { LibConfig, NblocksAppContextProvider } from '../../hooks/app-context';
import { NblocksAuthContextProvider } from '../../hooks/auth-context';
import { LangOverrideParam, NblocksThemeContextProvider } from '../../hooks/theme-context';
import { NblocksSecureContextProvider } from '../../hooks/secure-http-context';
import { BrandingConfig, ColorConfig } from '../../utils/BrandingConfig';

/**
 * Wrap your code into this Provider to get access to the Nblocks world
 * @param param0 
 * @returns 
 */
const NblocksProvider: FunctionComponent<{
  config?: Partial<LibConfig>,
  i18nOverrides?: LangOverrideParam[];
  styleOverrides?: Partial<BrandingConfig>;
  colorOverrides?: Partial<ColorConfig>;
  children: React.ReactNode;
}> = ({children, config, i18nOverrides, styleOverrides, colorOverrides}) => {

  const apiHost = config?.apiHost ? config.apiHost : "http://localhost:3000";
  const graphqlPath = config?.graphqlPath ? config.graphqlPath : "/graphql"

  return (
      <NblocksSecureContextProvider apiHost={apiHost} graphqlPath={graphqlPath} debug={!!config?.debug}>
        <NblocksAuthContextProvider>
          <NblocksAppContextProvider config={config}>
            <NblocksThemeContextProvider i18nOverrides={i18nOverrides} styleOverrides={styleOverrides} colorOverrides={colorOverrides}>
              {children}
            </NblocksThemeContextProvider>
          </NblocksAppContextProvider>
        </NblocksAuthContextProvider>
      </NblocksSecureContextProvider>
  );
}

export {NblocksProvider};