import { TestDataComponent } from './TestDataComponent';
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
        <TestDataComponent />
        <TestFeatureFlagsComponent />
    </div>)
}

export { TestComponent }