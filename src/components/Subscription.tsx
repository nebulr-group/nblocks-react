import React, { useEffect, useState } from "react";
import { useNblocksClient } from "../hooks/UseNblocksClient";
import { useTokens } from "../hooks/UseTokens";
import { useRedirect } from "../hooks/UseRedirect";

const SubscriptionComponent = () => {

    const { nblocksClient } = useNblocksClient()
    const { accessToken } = useTokens();
    const { replace } = useRedirect();

    useEffect(() => {
        doRedirect();
    }, [accessToken]);

    const doRedirect = async () => {
        try {
            if (accessToken) {
                const codeResponse = await nblocksClient.auth.getHandoverCode(accessToken);
                replace(nblocksClient.portal.getSelectPlanUrl(codeResponse.code));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (<p>Loading...</p>)

}

export { SubscriptionComponent }