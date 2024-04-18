// @ts-ignore
import { ProtectedComponent } from '@nebulr-group/nblocks-react-slim';

const TestProtectedComponent = () => {

    return (<>
        <h2>Protected component</h2>
        <table border={1}>
            <thead>
                <tr>
                    <th>Key</th>
                    <th>Yes?</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>User is authenticated</td>
                    <td>
                        <ProtectedComponent>
                            <span>Yes</span>
                        </ProtectedComponent>
                    </td>
                </tr>
                <tr>
                    <td>Privilege USER_READ</td>
                    <td>
                        <ProtectedComponent privileges={["USER_READ"]}>
                            <span>Yes</span>
                        </ProtectedComponent>
                    </td>
                </tr>
                <tr>
                    <td>Role Owner</td>
                    <td>
                        <ProtectedComponent roles={["OWNER"]}>
                            <span>Yes</span>
                        </ProtectedComponent>
                    </td>
                </tr>
            </tbody>
        </table>
    </>)
}

export { TestProtectedComponent }