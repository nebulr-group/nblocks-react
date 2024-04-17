import React, { useEffect, useState } from "react";
import { useNblocksClient } from "../hooks/UseNblocksClient";
import { useTokens } from "../hooks/UseTokens";

const SubscriptionComponent = () => {

    const { nblocksClient } = useNblocksClient()
    const { accessToken } = useTokens();

    useEffect(() => {
        doRedirect();
    }, [accessToken]);

    const doRedirect = async () => {
        try {
            if (accessToken) {
                const codeResponse = await nblocksClient.auth.getHandoverCode(accessToken);
                window.location.replace(nblocksClient.portal.getSelectPlanUrl(codeResponse.code));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (<p>Loading...</p>)

}

export { SubscriptionComponent }