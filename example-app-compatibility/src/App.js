import React from "react";
import "./styles.css";
import { FeatureFlagComponent, NblocksProvider } from '@nebulr-group/nblocks-react';

export default function App() {
    return (
        <NblocksProvider config={{ appId: '6654635275663f0022996d05', stage: 'DEV', debug: true }}>
            <div className="App">
                <h1>Hello World</h1>
                <FeatureFlagComponent flagKey="release-announcement">
                    <h2>Flag content</h2>
                </FeatureFlagComponent>
            </div>
        </NblocksProvider>
    );
}
