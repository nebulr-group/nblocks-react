import React, { useEffect } from "react";
import { useNblocksClient } from "../hooks/UseNblocksClient";
import { useTokens } from "../hooks/UseTokens";

const LogoutComponent = () => {

    const { destroyTokens } = useTokens();
    const { nblocksClient } = useNblocksClient();

    useEffect(() => {
        destroyTokens();
        window.location.replace(nblocksClient.auth.getLogoutUrl());
    }, [nblocksClient]);

    return (null);
}

export { LogoutComponent }