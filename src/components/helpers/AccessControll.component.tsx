import React, { FunctionComponent } from 'react';
import { useAuth } from '../../hooks/auth-context';

/**
 * This component shows or hides its children if a user has certain role
 * @param param0 
 * @returns 
 */
const AccessControllComponent:FunctionComponent<{roles: string[], children: React.ReactNode}> = ({children, roles}) => {

    const {currentUser} = useAuth();
    if (currentUser.hasRole(roles))
        return (<>{children}</>);
    else
        return (null);
}

export {AccessControllComponent};
