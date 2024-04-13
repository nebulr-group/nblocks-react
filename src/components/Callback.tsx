import React, { useEffect, useState } from "react";
import { useNblocksClient } from "../hooks/UseNblocksClient";
import { useTokensStorage } from "../hooks/UseTokensStorage";
import { useConfig } from "../providers/ConfigProvider";
import { useLog } from "../hooks/UseLog";

// Users will get back to this component after finishing login
const CallbackComponent = () => {

    const {log} = useLog();
    const { handoverPath } = useConfig();
    const { nblocksClient } = useNblocksClient()
    const { setAccessToken, setIdToken, setRefreshToken } = useTokensStorage();

    useEffect(() => {
        const code = new URLSearchParams(location.search).get("code");
        if (code) {
            handleCallback(code);
        }
    }, [nblocksClient]);

    const handleCallback = async (code: string) => {
        if (nblocksClient) {
            try {
                const { tokens } = await nblocksClient.auth.getTokensAndVerify(code);
                setAccessToken(tokens.access_token);
                setRefreshToken(tokens.refresh_token);

                if (tokens.id_token)
                    setIdToken(tokens.id_token);
                
                log("Successfully resolved all tokens!");

                window.location.href = handoverPath;
            } catch (error) {
                console.error(error);
                alert("Could not login. Check developer console for more information.")
            }
        }
    };

    return (<p>Loading...</p>);
}

export { CallbackComponent }