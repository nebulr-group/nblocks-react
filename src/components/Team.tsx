import React, { useEffect, useState } from "react";
import { useNblocksClient } from "../hooks/UseNblocksClient";
import { useTokens } from "../hooks/UseTokens";

const TeamComponent = () => {

    const { nblocksClient } = useNblocksClient()
    const { accessToken } = useTokens();

    const [portalUrl, setPortalUrl] = useState<string | undefined>();

    useEffect(() => {
        getUrl();
    }, [accessToken]);

    const getUrl = async () => {
        try {
            if (accessToken) {
                const codeResponse = await nblocksClient.auth.getHandoverCode(accessToken);
                setPortalUrl(nblocksClient.portal.getUserManagementUrl(codeResponse.code));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return portalUrl ? (
        <iframe
            src={portalUrl}
            style={{
                width: "100%",
                height: "100%",
                border: "none",
            }}
        >
        </iframe>
    ) : <p>Loading...</p>;

}

export { TeamComponent }