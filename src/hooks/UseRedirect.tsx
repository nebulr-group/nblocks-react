import { useConfig } from '../providers/ConfigProvider';
import { useLog } from './UseLog';

/** Must be within NblocksProvider ctx */
const useRedirect = () => {

  const { disableRedirects } = useConfig();
  const { log } = useLog();

  const navigate = (url: string) => {
    if (disableRedirects) {
      log(`Redirect disabled. Would have redirected the user to ${url} by now`)
    } else {
      window.location.href = url;
    }
  }

  const replace = (url: string) => {
    if (disableRedirects) {
      log(`Redirect disabled. Would have redirected the user to ${url} by now`)
    } else {
      window.location.replace(url);
    }
  }

  return {
    navigate,
    replace
  }
};

export { useRedirect };
