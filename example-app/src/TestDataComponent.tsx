// @ts-ignore
import { useMe, useTokens, useNblocksClient } from '@nebulr-group/nblocks-react-slim';
import { config } from './App';

const TestDataComponent = () => {

    const { profile } = useMe();
    const { idToken, accessToken, refreshToken } = useTokens();
    const { nblocksClient } = useNblocksClient();
    

    const getExpDate = (token: string) => {
        return token ? new Date(nblocksClient.auth.contextHelper.getTokenExpiration(token) * 1000).toISOString() : "N/A";
    }

    return (<>
        <h2>Config</h2>
        <pre>{JSON.stringify(config, null, "\t")}</pre>
        <h2>Data</h2>
        <table border={1}>
            <thead>
                <tr>
                    <th>Key</th>
                    <th>Resolved</th>
                    <th>EXP</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>ID Token</td>
                    <td><pre>{profile ? JSON.stringify(profile, null, "\t") : "N/A"}</pre></td>
                    <td>{getExpDate(idToken) || "Could not resolve!"}</td>
                    <td>{idToken ? idToken.substring(0, 100) : "N/A"}...</td>
                </tr>
                <tr>
                    <td>Access Token</td>
                    <td><pre>N/A</pre></td>
                    <td>{getExpDate(accessToken) || "Could not resolve!"}</td>
                    <td>{accessToken ? accessToken.substring(0, 100) : "N/A"}...</td>
                </tr>
                <tr>
                    <td>Refresh Token</td>
                    <td><pre>N/A</pre></td>
                    <td>{getExpDate(refreshToken) || "Could not resolve!"}</td>
                    <td>{refreshToken ? refreshToken.substring(0, 100) : "N/A"}...</td>
                </tr>
            </tbody>
        </table>
    </>)
}

export { TestDataComponent }