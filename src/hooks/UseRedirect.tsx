import { useConfig } from '../providers/ConfigProvider';
import { useLog } from './UseLog';

/** Must be within NblocksProvider ctx */
const useRedirect = () => {

  const { disableRedirects } = useConfig();
  const { log } = useLog();
  const { debug } = useConfig();

  const debugDelayRedirectS = 3;
  const restrictedPaths = ['/login', '/logout', '/auth/callback'];

  const navigate = (url: string) => {
    if (disableRedirects) {
      log(`Redirect disabled. Would have redirected the user to ${url} by now`, true)
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
  }

  const replace = (url: string) => {
    if (disableRedirects) {
      log(`Redirect disabled. Would have redirected the user to ${url} by now`, true)
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
  }

  const restrictedTokenPath = () => {
    const restricted = restrictedPaths.some(path => path == window.location.pathname);
    if (restricted) {
      log(`Current pathname: ${window.location.pathname} is restriced for token refresh operations`);
    }
    return restricted;
  }

  const _navigate = (url: string) => {
    window.location.href = url;
  }

  const _replace = (url: string) => {
    window.location.replace(url);
  }

  return {
    navigate,
    replace,
    restrictedTokenPath
  }
};

export { useRedirect };
