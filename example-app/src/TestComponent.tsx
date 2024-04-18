import { TestTokensComponent } from './TestTokensComponent';
import { TestFeatureFlagsComponent } from './TestFeatureFlagsComponent';
import { TestProtectedComponent } from './TestProtectedComponent';

const TestComponent = () => {

    return (<div>
        <h1>Nblocks Example app</h1>
        <div>
            <a href='/login'>Login</a>
        </div>
        <div>
            <a href='/logout'>Logout</a>
        </div>
        <TestTokensComponent />
        <TestFeatureFlagsComponent />
        <TestProtectedComponent />
    </div>)
}

export { TestComponent }