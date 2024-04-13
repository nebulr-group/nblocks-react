import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { useNblocksClient } from "../hooks/UseNblocksClient";
import { useTokensStorage } from "../hooks/UseTokensStorage";
import { AuthContext } from "@nebulr-group/nblocks-ts-client";
import { useLog } from "../hooks/UseLog";

interface ComponentProps {
    roles: string[];
    privileges: string[];

    // In case of unauthorized, where should the user be redirected to?
    redirectTo?: string;
    children: ReactElement;
}

// Protect either its children or a whole route
const Protected: FunctionComponent<ComponentProps> = ({ roles, privileges, redirectTo, children }) => {

    const { log } = useLog();
    const { nblocksClient } = useNblocksClient()
    const { getAccessToken } = useTokensStorage();

    // This will be our variable telling if the user is granted access or if we should redirect to login
    // Initially this variable is true since we don't want to redirect before resolving the 
    const [granted, setGranted] = useState(true);

    useEffect(() => {
        doAuthorize();
    }, [nblocksClient]);

    useEffect(() => {
        log(`User has ${granted ?  '' : 'NOT'} the right to be here / se this`);
        if (!granted && redirectTo) 
            window.location.replace(redirectTo);
    }, [granted]);

    const doAuthorize = async () => {
        if (nblocksClient) {
            try {
                // Retrieve the access token JWT from localstorage
                const accessToken = getAccessToken();
    
                if (accessToken) {
                    const authCtx = await nblocksClient.auth.contextHelper.getAuthContextVerified(accessToken);
                    const isGranted = hasRoleOrPrivilege(authCtx);
                    log(`Unserializing the accessToken shows granted ${isGranted}`);
                    setGranted(isGranted);
                } else {
                    setGranted(false);
                }
            } catch (error) {
                console.error(error)
                setGranted(false);
            }
        }
    }

    // Helper method to see if the users token contains any of the required roles or privileges 
    const hasRoleOrPrivilege = (authCtx: AuthContext) => {
        return roles ? roles.includes(authCtx.userRole) : false || privileges ? privileges.some(scope => authCtx.privileges.includes(scope)) : false;
    }

    // Only if granted should we render the component children
    if (granted)
        return (children);
    else
        return (null);

}

export { Protected }