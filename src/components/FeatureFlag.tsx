import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { FlagContext } from "@nebulr-group/nblocks-ts-client";
import { useFlags } from "../hooks/UseFlags";

interface ComponentProps {
    flagKey: string;
    context?: FlagContext;
    children: ReactElement;
}

// Protect either its children or a whole route
const FeatureFlag: FunctionComponent<ComponentProps> = ({ flagKey, context, children }) => {

    const { flagsStorage, flagEnabled } = useFlags();

    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        setEnabled(flagEnabled(flagKey))
    }, [flagsStorage]);

    // Only if enabled should we render the component children
    if (enabled) return children;
    else return '';


}

export { FeatureFlag }