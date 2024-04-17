import React, { useEffect } from "react";
import { useLog } from "../hooks/UseLog";
import { useTokens } from "../hooks/UseTokens";

const AccessTokenSpy = () => {

    const { accessToken } = useTokens();
    const { log } = useLog();

    useEffect(() => {
        log(`Hello from AccessTokenSpy listening on accessToken which is: ${accessToken}`)
    }, [accessToken]);

    return (null);
}

export { AccessTokenSpy }