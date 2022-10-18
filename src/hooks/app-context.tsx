import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { App, useGetAppAnonymousQuery } from "../generated/graphql";

interface AppContextProps extends App {
  defaultLocale: string;
  apiHost: string;
  graphqlPath: string;
  debug: boolean;
}

const initialAppContext:AppContextProps = {
  defaultLocale: 'en',
  apiHost: "", 
  graphqlPath: "",
  debug: false
};

const AppContext = React.createContext<AppContextProps>(initialAppContext);
const useApp = () => useContext(AppContext);

export interface LibConfig {

  // Output debug messages from plugin
  debug: boolean

  /** Base Url to a backend API running a NBlocks compatable feature set. E.g. `https://api.myapp.com` */
  apiHost: string;

  /** The path which host the graphql endpoint, will be concatenated with apiHost. E.g. `/graphql` */
  graphqlPath: string;

  /** View routes that are considered public accessable and interceptors should not require authentication context. E.g. `['/about', '/home']` */
  openRoutes: string[];

  /** Available languages that the user can set for the workspace. Can just be 'en' or 'sv' at the moment */
  languages: string[];

  /** Enable password complexity according to ISO27001 */
  passwordComplexity: boolean;

  /** Ask for personal information after first time user logs in. Can be setup to require specific fields */
  onboarding: {
    enabled: boolean,
    requiredFields: {
      firstName: boolean;
      lastName: boolean;
      phoneNumber: boolean;
    }
  }

  /** Available social login providers and account api data that the user can use for authorization. */
  socialLogins: {
    accountApiHost: string;
    appId: string;
    providers: {
      google: boolean;
      github: boolean;
      facebook: boolean;
    }
  },
}

const NblocksAppContextProvider: FunctionComponent<{config?: Partial<LibConfig>; children: React.ReactNode;}> = ({children, config}) => {

  
  const {data, loading, error} = useGetAppAnonymousQuery();

  useEffect(() => {
  });

    return (
      <AppContext.Provider value={
        {...initialAppContext,...{
        name: data?.getAppAnonymous.name,
        defaultLocale: 'en', 
        logo: data?.getAppAnonymous.logo,  
        privacyPolicyUrl: data?.getAppAnonymous.privacyPolicyUrl,
        debug: !!config?.debug
        }}}>
        {children}
      </AppContext.Provider>
    );
}

export {NblocksAppContextProvider, useApp};