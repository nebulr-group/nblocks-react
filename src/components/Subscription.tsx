import React, { useEffect, useState } from "react";
import { useNblocksClient } from "../hooks/UseNblocksClient";
import { useTokensStorage } from "../hooks/UseTokensStorage";

const SubscriptionComponent = () => {

    const { nblocksClient } = useNblocksClient()
    const { getAccessToken } = useTokensStorage();

    useEffect(() => {
        doRedirect();
    }, [nblocksClient]);

    const doRedirect = async () => {
        if (nblocksClient) {
            try {
                const accessToken = getAccessToken();
                if (accessToken) {
                    const codeResponse = await nblocksClient.auth.getHandoverCode(accessToken);
                    window.location.replace(nblocksClient.portal.getSelectPlanUrl(codeResponse.code));
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (<p>Loading...</p>)
  
}

export { SubscriptionComponent }