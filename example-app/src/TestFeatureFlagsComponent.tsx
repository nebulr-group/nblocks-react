import { FeatureFlagComponent, useFlags } from '@nebulr-group/nblocks-react';

const TestFeatureFlagsComponent = () => {

    const { setContext } = useFlags()
    const triggerContext = () => {
        setContext({device: {key: "iphone"}})
    }

    return (<>
        <h2>Feature flags</h2>
        <table border={1}>
            <thead>
                <tr>
                    <th>Key</th>
                    <th>Enabled</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>release-announcement</td>
                    <td>
                        <FeatureFlagComponent flagKey={"release-announcement"}>
                            <span>Enabled</span>
                        </FeatureFlagComponent>
                    </td>
                </tr>
                <tr>
                    <td>iphone-feature</td>
                    <td>
                        <FeatureFlagComponent flagKey={"iphone-feature"}>
                            <span>Enabled</span>
                        </FeatureFlagComponent>
                    </td>
                </tr>
                <tr>
                    <td>premium-features</td>
                    <td>
                        <FeatureFlagComponent flagKey={"premium-features"}>
                            <span>Enabled</span>
                        </FeatureFlagComponent>
                    </td>
                </tr>
                <tr>
                    <td>owner-features</td>
                    <td>
                        <FeatureFlagComponent flagKey={"owner-features"}>
                            <span>Enabled</span>
                        </FeatureFlagComponent>
                    </td>
                </tr>
                <tr>
                    <td>admin-features</td>
                    <td>
                        <FeatureFlagComponent flagKey={"admin-features"}>
                            <span>Enabled</span>
                        </FeatureFlagComponent>
                    </td>
                </tr>
            </tbody>
        </table>
        <button onClick={triggerContext}>Trigger context</button>
    </>)
}

export { TestFeatureFlagsComponent }