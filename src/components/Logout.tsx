import React, { useEffect } from "react";
import { useNblocksClient } from "../hooks/UseNblocksClient";
import { useTokensStorage } from "../hooks/UseTokensStorage";

const LogoutComponent = () => {

    const { destroyStorage } = useTokensStorage();
    const { nblocksClient } = useNblocksClient();

    useEffect(() => {
       if (nblocksClient) {
        destroyStorage();
        window.location.replace(nblocksClient.auth.getLogoutUrl());
       }

    }, [nblocksClient]);

    return (null);
}

export { LogoutComponent }