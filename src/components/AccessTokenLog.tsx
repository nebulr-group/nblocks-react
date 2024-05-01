import React, { useEffect } from "react";
import { useLog } from "../hooks/UseLog";
import { useTokens } from "../hooks/UseTokens";
import { useNblocksClient } from "../hooks/UseNblocksClient";

const AccessTokenLog = () => {

    const { accessToken } = useTokens();
    const { log } = useLog();
    const { nblocksClient } = useNblocksClient();

    const getExpDate = (token?: string) => {
        return token ? new Date(nblocksClient.auth.contextHelper.getTokenExpiration(token) * 1000).toISOString() : "N/A";
    }

    useEffect(() => {
        log(`Hello from AccessTokenLog listening on accessToken which now expires ${getExpDate(accessToken)}`);
    }, [accessToken]);

    return (null);
}

export { AccessTokenLog }