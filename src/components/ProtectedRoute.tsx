import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { useNblocksClient } from "../hooks/UseNblocksClient";
import { AuthContext } from "@nebulr-group/nblocks-ts-client";
import { useLog } from "../hooks/UseLog";
import { useTokens } from "../hooks/UseTokens";
import { useRedirect } from "../hooks/UseRedirect";

interface ComponentProps {
    // In case of unauthorized, where should the user be redirected to. Defaults to /login
    redirectTo?: string;
    children: ReactElement;
}

// Protect a whole route
const ProtectedRouteComponent: FunctionComponent<ComponentProps> = ({ redirectTo = "/login", children }) => {
    
    const { log } = useLog();
    const { nblocksClient } = useNblocksClient()
    const { accessToken } = useTokens();
    const { replace } = useRedirect();

    const AUTHENTICATED_SCOPE = "AUTHENTICATED";

    // This will be our variable telling if the user is granted access or if we should redirect to login
    // Initially this variable is true since we don't want to redirect before resolving the 
    const [granted, setGranted] = useState(true);

    useEffect(() => {
        doAuthorize();
    }, [accessToken]);

    useEffect(() => {
        log(`User has ${granted ? '' : 'NOT'} the right to be on this route`);
        if (!granted) {
            replace(redirectTo);
        }
    }, [granted]);

    const doAuthorize = async () => {
        try {
            // Retrieve the access token JWT from localstorage
            if (accessToken) {
                const authCtx = await nblocksClient.auth.contextHelper.getAuthContextVerified(accessToken);
                const isGranted = isAuthenticated(authCtx);
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
    const isAuthenticated = (authCtx: AuthContext) => {
        return authCtx.privileges.includes(AUTHENTICATED_SCOPE);
    }

    // Only if granted should we render the component children
    if (granted)
        return (children);
    else
        return (null);

}

export { ProtectedRouteComponent }