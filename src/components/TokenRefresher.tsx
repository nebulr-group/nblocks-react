import React, { useEffect } from "react";
import { useLog } from "../hooks/UseLog";
import { useTokens } from "../hooks/UseTokens";
import { useNblocksClient } from "../hooks/UseNblocksClient";
import { useRedirect } from "../hooks/UseRedirect";

// This component pulls a new access token on page load if valid refresh token exists
// This component should standby if route is /login or /logout or /callback (noTokenRefreshOnCurrentPath)
const TokenRefresherComponent = () => {

    const retrySec = 60;
    const { nblocksClient } = useNblocksClient()
    const { log } = useLog();
    const { accessToken, refreshToken, setAccessToken, setIdToken, setRefreshToken } = useTokens();
    const { noTokenRefreshOnCurrentPath } = useRedirect();

    useEffect(() => {
        init();
        refreshTokens();
    }, [nblocksClient]);

    const refreshTokens = async () => {
        try {
            if (refreshToken && !noTokenRefreshOnCurrentPath()) {
                const { tokens } = await nblocksClient.auth.refreshTokensAndVerify(refreshToken);
                setAccessToken(tokens.access_token);
                setRefreshToken(tokens.refresh_token);

                if (tokens.id_token)
                    setIdToken(tokens.id_token);

                log(`Tokens refreshed, scheduling new refresh in ${tokens.expires_in} s`);
                setTimeout(refreshTokens, tokens.expires_in * 1000);
            } else {
                if (noTokenRefreshOnCurrentPath())
                    log(`Tokens should not be refreshed on current path (/login /logout /auth/callback)! Trying another refresh in ${retrySec}s`);

                if (!refreshToken)
                    log(`No refresh token found! Trying another refresh in ${retrySec}s`);
                
                setTimeout(refreshTokens, retrySec * 1000);
            }
        } catch (error) {
            console.error(error);
            alert("Could not refresh tokens. Check developer console for more information.");
            log(`Due to previous error! Trying another refresh in ${retrySec}s`);
            setTimeout(refreshTokens, retrySec * 1000);
        }
    };

    const init = () => {
        if (refreshToken && new Date().getTime() > nblocksClient.auth.contextHelper.getTokenExpiration(refreshToken) * 1000) {
            log('Expired refresh token. Removing!');
            window.localStorage.removeItem('refresh_token');
        }

        if (accessToken && new Date().getTime() > nblocksClient.auth.contextHelper.getTokenExpiration(accessToken) * 1000) {
            log('Expired access token. Removing!');
            window.localStorage.removeItem('access_token');
        }
    }

    return (null);
}

export { TokenRefresherComponent }