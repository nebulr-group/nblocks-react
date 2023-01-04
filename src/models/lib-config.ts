export interface LibConfig {
  /** Sets several other configs into a sensible default for development */
  devMode: boolean;

  // Output debug messages from plugin
  debug: boolean;

  // Switch for backendless use case.
  backendLess: boolean;

  // Allow for simple signup. Part of the developer onboarding and app configuration. Should be disabled before deploying. This property might also be renamed soon.
  signup: boolean;

  // The plugin will redirect to this route after a succesful login or completed onboarding. Defaults to `/`
  handoverRoute: string;

  /** Base Url to a backend API running a NBlocks compatable feature set. E.g. `https://api.myapp.com` */
  apiHost: string;

  /** The path which host the graphql endpoint, will be concatenated with apiHost. E.g. `/graphql` */
  graphqlPath: string;

  /** View routes that are considered public accessable and interceptors should not require authentication context. E.g. `['/about', '/home']` */
  openRoutes: string[];

  /** Available languages that the user can set for the workspace. Can just be 'en' or 'sv' at the moment */
  languages: string[];

  /** Fallback to a certain language if we couldn't identify the currect locale of the user */
  defaultLocale: string;

  /** Enable password validation according to ISO27001 */
  passwordValidation: boolean;

  /** Bring-Your-Own password challenge, overriding the ISO27001 standard*/
  passwordComplexityRegex?: RegExp;

  /** If this is a single page application and to have routes for /auth etc provided by plugin or bring your own react router */
  spa: boolean;

  /** Available social login providers and account api data that the user can use for authorization. */
  socialLogins: {
    accountApiHost: string;
    appId: string;
    providers: {
      google: boolean;
      github: boolean;
      facebook: boolean;
    };
  };
}
