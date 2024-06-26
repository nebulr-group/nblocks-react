import React, { useEffect } from "react";
import { useLog } from "../hooks/UseLog";
import { useTokens } from "../hooks/UseTokens";
import { useNblocksClient } from "../hooks/UseNblocksClient";
import { useRedirect } from "../hooks/UseRedirect";

// This component pulls a new access token on page load if valid refresh token exists
// This component should standby if route is /login or /logout or /callback (restrictedTokenPath)
const TokenRefresherComponent = () => {

    const retrySec = 60;
    const { nblocksClient } = useNblocksClient()
    const { log } = useLog();
    const { accessToken, refreshToken, setAccessToken, setIdToken, setRefreshToken } = useTokens();
    const { restrictedTokenPath } = useRedirect();

    useEffect(() => {
        clearExpiredTokens();
        refreshTokens();
    }, [nblocksClient]);

    const refreshTokens = async () => {
        try {
            if (refreshToken && !restrictedTokenPath()) {
                const { tokens } = await nblocksClient.auth.refreshTokensAndVerify(refreshToken);
                setAccessToken(tokens.access_token);
                setRefreshToken(tokens.refresh_token);

                if (tokens.id_token)
                    setIdToken(tokens.id_token);

                const expiresIn = Math.floor(tokens.expires_in * 0.9);
                log(`Tokens refreshed, scheduling new refresh in ${expiresIn} s because token expires in ${tokens.expires_in} s`);
                setTimeout(refreshTokens, expiresIn * 1000);
            } else {
                if (restrictedTokenPath())
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

    const clearExpiredTokens = () => {
        if (refreshToken && new Date().getTime() > nblocksClient.auth.contextHelper.getTokenExpiration(refreshToken) * 1000) {
            log('Expired refresh token. Removing!');
            setRefreshToken(undefined);
        }

        if (accessToken && new Date().getTime() > nblocksClient.auth.contextHelper.getTokenExpiration(accessToken) * 1000) {
            log('Expired access token. Removing!');
            setAccessToken(undefined);
        }
    }

    return (null);
}

export { TokenRefresherComponent }