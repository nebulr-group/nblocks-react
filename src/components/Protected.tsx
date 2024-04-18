import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { useNblocksClient } from "../hooks/UseNblocksClient";
import { AuthContext } from "@nebulr-group/nblocks-ts-client";
import { useLog } from "../hooks/UseLog";
import { useTokens } from "../hooks/UseTokens";
import { useRedirect } from "../hooks/UseRedirect";

interface ComponentProps {
    roles?: string[];
    privileges?: string[];

    // In case of unauthorized, where should the user be redirected to?
    redirectTo?: string;
    children: ReactElement;
}

// Protect either its children or a whole route
const ProtectedComponent: FunctionComponent<ComponentProps> = ({ roles, privileges = ["AUTHENTICATED"], redirectTo, children }) => {
    
    const { log } = useLog();
    const { nblocksClient } = useNblocksClient()
    const { accessToken } = useTokens();
    const { replace } = useRedirect();

    // This will be our variable telling if the user is granted access or if we should redirect to login
    // Initially this variable is true since we don't want to redirect before resolving the 
    const [granted, setGranted] = useState(true);

    useEffect(() => {
        doAuthorize();
    }, [accessToken]);

    useEffect(() => {
        log(`User has ${granted ? '' : 'NOT'} the right to be here / se this`);
        if (!granted && redirectTo)
            replace(redirectTo);
    }, [granted]);

    const doAuthorize = async () => {
        try {
            // Retrieve the access token JWT from localstorage
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

export { ProtectedComponent }