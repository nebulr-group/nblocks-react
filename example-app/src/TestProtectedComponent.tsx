const TestProtectedComponent = () => {

    return (<div>
        <h1>Nblocks Example app (protected content)</h1>
        <div>
            <a href='/'>Back</a>
        </div>
        <p>If you see this message you are authenticated because the route is put behind <i>ProtectedRouteComponent</i> </p>
    </div>)
}

export { TestProtectedComponent }