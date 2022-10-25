import React, { FunctionComponent } from 'react';
import { NblocksAppContextProvider } from '../../hooks/app-context';
import { NblocksAuthContextProvider } from '../../hooks/auth-context';
import { LangOverrideParam, NblocksThemeContextProvider } from '../../hooks/theme-context';
import { NblocksSecureContextProvider } from '../../hooks/secure-http-context';
import { BrandingConfig, ColorConfig } from '../../utils/BrandingConfig';
import { NblocksConfigContextProvider } from '../../hooks/config-context';
import { LibConfig } from '../../models/lib-config';

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

  return (
    <NblocksConfigContextProvider config={config}>
      <NblocksSecureContextProvider>
        <NblocksAuthContextProvider>
          <NblocksAppContextProvider>
            <NblocksThemeContextProvider i18nOverrides={i18nOverrides} styleOverrides={styleOverrides} colorOverrides={colorOverrides}>
              {children}
            </NblocksThemeContextProvider>
          </NblocksAppContextProvider>
        </NblocksAuthContextProvider>
      </NblocksSecureContextProvider>
    </NblocksConfigContextProvider>
  );
}

export {NblocksProvider};