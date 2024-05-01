import { TestTokensComponent } from './TestTokensComponent';
import { TestFeatureFlagsComponent } from './TestFeatureFlagsComponent';

const TestComponent = () => {

    return (<div>
        <h1>Nblocks Example app</h1>
        <div>
            <a href='/login'>Login</a>
        </div>
        <div>
            <a href='/logout'>Logout</a>
        </div>
        <div>
            <a href='/protected'>Protected</a>
        </div>
        <div>
            <a href='/protected-redirect'>Protected with login redirect</a>
        </div>
        <div>
            <a href='/team'>Team</a>
        </div>
        <div>
            <a href='/subscription'>Subscription</a>
        </div>
        <TestTokensComponent />
        <TestFeatureFlagsComponent />
    </div>)
}

export { TestComponent }