// @ts-ignore
import { FeatureFlagComponent } from '@nebulr-group/nblocks-react-slim';

const TestFeatureFlagsComponent = () => {

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
    </>)
}

export { TestFeatureFlagsComponent }