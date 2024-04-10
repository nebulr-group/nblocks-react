import React, { useEffect } from "react";
import { useNblocksClient } from "../hooks/UseNblocksClient";
import { useTokensStorage } from "../hooks/UseTokensStorage";

const LoginComponent = () => {

    const { destroyStorage } = useTokensStorage();
    const { nblocksClient } = useNblocksClient();

    useEffect(() => {
       if (nblocksClient) {
        destroyStorage();
        window.location.replace(nblocksClient.auth.getLoginUrl());
       }

    }, [nblocksClient]);

    return (null);
}

export { LoginComponent }