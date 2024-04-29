import { useConfig } from "./config-context";
import { useLog } from "./use-log";

/** Must be within NblocksProvider ctx */
const useRedirect = () => {
  const { disableRedirects, debug } = useConfig();
  const { log } = useLog();

  const debugDelayRedirectS = 3;

  const navigate = (url: string) => {
    if (disableRedirects) {
      log(
        `Redirect disabled. Would have redirected the user to ${url} by now`,
        true
      );
    } else {
      if (debug) {
        log(`Redirecting in ${debugDelayRedirectS} seconds...`, true);
        setTimeout(() => {
          _navigate(url);
        }, debugDelayRedirectS * 1000);
      } else {
        _navigate(url);
      }
    }
  };

  const replace = (url: string) => {
    if (disableRedirects) {
      log(
        `Redirect disabled. Would have redirected the user to ${url} by now`,
        true
      );
    } else {
      if (debug) {
        log(`Redirecting in ${debugDelayRedirectS} seconds...`, true);
        setTimeout(() => {
          _replace(url);
        }, debugDelayRedirectS * 1000);
      } else {
        // Just straight forward
        _replace(url);
      }
    }
  };

  const noTokenRefreshOnCurrentPath = () => {
    return ["/login", "/logout", "/auth/callback"].some(
      (path) => path == window.location.pathname
    );
  };

  const _navigate = (url: string) => {
    window.location.href = url;
  };

  const _replace = (url: string) => {
    window.location.replace(url);
  };

  return {
    navigate,
    replace,
    noTokenRefreshOnCurrentPath,
  };
};

export { useRedirect };
