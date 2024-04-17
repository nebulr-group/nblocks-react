import React, { useEffect } from "react";
import { useLog } from "../hooks/UseLog";
import { useTokens } from "../hooks/UseTokens";
import { useNblocksClient } from "../hooks/UseNblocksClient";

// TODO this component should pull a new access token on page load if valid refresh token exists
// TODO this component should standby if route is /login or /logout or /callback
const TokenRefresherComponent = () => {

    const retrySec = 60;
    const { nblocksClient } = useNblocksClient()
    const { log } = useLog();
    const { accessToken, refreshToken, setAccessToken, setIdToken, setRefreshToken } = useTokens();

    useEffect(() => {
        init();
        refreshTokens();
    }, [nblocksClient]);

    const refreshTokens = async () => {
        try {
            if (refreshToken) {
                const { tokens } = await nblocksClient.auth.refreshTokensAndVerify(refreshToken);
                setAccessToken(tokens.access_token);
                setRefreshToken(tokens.refresh_token);

                if (tokens.id_token)
                    setIdToken(tokens.id_token);

                log(`Tokens refreshed, scheduling new refresh in ${tokens.expires_in} s`);
                setTimeout(refreshTokens, tokens.expires_in * 1000);
            } else {
                log(`No refresh token found! Trying another refresh in ${retrySec}s`);
                setTimeout(refreshTokens, retrySec * 1000);
            }
        } catch (error) {
            console.error(error);
            alert("Could not refresh tokens. Check developer console for more information.")
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