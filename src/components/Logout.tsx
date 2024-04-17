import React, { useEffect } from "react";
import { useNblocksClient } from "../hooks/UseNblocksClient";
import { useTokens } from "../hooks/UseTokens";
import { useRedirect } from "../hooks/UseRedirect";

const LogoutComponent = () => {

    const { destroyTokens } = useTokens();
    const { nblocksClient } = useNblocksClient();
    const { replace } = useRedirect();

    useEffect(() => {
        destroyTokens();
        replace(nblocksClient.auth.getLogoutUrl());
    }, [nblocksClient]);

    return (null);
}

export { LogoutComponent }