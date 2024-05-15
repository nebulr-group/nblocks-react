export interface LibConfig {
  /** Sets several other configs into a sensible default for development.
   * `spa=true`, `tenantSignup=true`, `appSignup=true`, `passwordValidation=false`
   */
  devMode: boolean;

  // Output debug messages from plugin
  debug: boolean;

  // Switch for backendless use case.
  backendLess: boolean;

  // Must be set if running with backendless
  appId?: string;

  // Switches between the legacy authentication and OAuth 2.0 JWT Bearer Tokens. Defaults to true
  authLegacy: boolean;

  // URL to Nblocks Auth API. Defaults UI url + /auth/login. You should not change this manually unless your running tests
  oAuthBaseURI: string;

  // URL to Nblocks account API used during create Nblocks app process. You should not change this manually unless your running tests
  accountApiBaseUri: string;

  // Redirect URI for OAuth 2.0 flow. Point this to your callback screen. You should not change this manually unless your running tests.
  oauthRedirectUri: string;

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

  // A copyright footer that is shown on auth views
  copyrightFooter: string;

  disableRedirects?: boolean;
}
