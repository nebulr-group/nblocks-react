import React, { useEffect } from "react";
import { useNblocksClient } from "../hooks/UseNblocksClient";
import { useTokens } from "../hooks/UseTokens";

const LoginComponent = () => {

    const { destroyTokens } = useTokens();
    const { nblocksClient } = useNblocksClient();

    useEffect(() => {
        destroyTokens();
        window.location.replace(nblocksClient.auth.getLoginUrl());
    }, [nblocksClient]);

    return (null);
}

export { LoginComponent }