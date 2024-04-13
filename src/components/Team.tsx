import React, { useEffect, useState } from "react";
import { useNblocksClient } from "../hooks/UseNblocksClient";
import { useTokensStorage } from "../hooks/UseTokensStorage";

const TeamComponent = () => {

    const { nblocksClient } = useNblocksClient()
    const { getAccessToken } = useTokensStorage();

    const [portalUrl, setPortalUrl] = useState<string | undefined>();

    useEffect(() => {
        getUrl();
    }, [nblocksClient]);

    const getUrl = async () => {
        if (nblocksClient) {
            try {
                const accessToken = getAccessToken();
                if (accessToken) {
                    const codeResponse = await nblocksClient.auth.getHandoverCode(accessToken);
                    setPortalUrl(nblocksClient.portal.getUserManagementUrl(codeResponse.code));
                }
            } catch (error) {
                console.error(error);
            }
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