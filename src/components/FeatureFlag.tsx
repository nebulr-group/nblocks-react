import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { useFlags } from "../hooks/UseFlags";

interface ComponentProps {
    flagKey: string;
    children: ReactElement;
}

// Protect either its children or a whole route
const FeatureFlagComponent: FunctionComponent<ComponentProps> = ({ flagKey, children }) => {

    const { flagsStorage, flagEnabled } = useFlags();

    const [enabled, setEnabled] = useState(false);

    // Run evaluation only when we have flagStorage resolved
    useEffect(() => {
        setEnabled(flagEnabled(flagKey))
    }, [flagsStorage]);

    // Only if enabled should we render the component children
    if (enabled) return children;
    else return '';


}

export { FeatureFlagComponent }