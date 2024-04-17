import React, { useEffect } from "react";
import { useNblocksClient } from "../hooks/UseNblocksClient";
import { useConfig } from "../providers/ConfigProvider";
import { useLog } from "../hooks/UseLog";
import { useTokens } from "../hooks/UseTokens";
import { useRedirect } from "../hooks/UseRedirect";

// Users will get back to this component after finishing login
const CallbackComponent = () => {

    const { log } = useLog();
    const { handoverPath } = useConfig();
    const { nblocksClient } = useNblocksClient()
    const { setAccessToken, setIdToken, setRefreshToken } = useTokens();
    const { navigate } = useRedirect();

    useEffect(() => {
        const code = new URLSearchParams(location.search).get("code");
        if (code) {
            handleCallback(code);
        }
    }, [nblocksClient]);

    const handleCallback = async (code: string) => {
        try {
            const { tokens } = await nblocksClient.auth.getTokensAndVerify(code);
            setAccessToken(tokens.access_token);
            setRefreshToken(tokens.refresh_token);

            if (tokens.id_token)
                setIdToken(tokens.id_token);

            log("Successfully resolved all tokens!");

            navigate(handoverPath);
        } catch (error) {
            console.error(error);
            alert("Could not login. Check developer console for more information.")
        }
    };

    return (<p>Loading...</p>);
}

export { CallbackComponent }