# Compatibility check for plugin

This project contains a simple hello world example in React.
Using function components.

With this one we can test backward compatibility with previous versions of React.

```
# Open up in container
docker run --rm -it -p 3000:3000 -v $(pwd):/app --network nblocks-stack_shared-network --entrypoint /bin/bash node:20
docker run --rm -it -p 3000:3000 -v $(pwd):/app --network nblocks-stack_shared-network --entrypoint /bin/bash node:16

# Clean up project dependencies
npm uninstall react react-dom @nebulr-group/nblocks-react

# Install new React version. E.g.
npm install react@18 react-dom@18
npm install react@17 react-dom@17
npm install react@16 react-dom@16
npm install react@15 react-dom@15

# Install plugin from NPM / Verdaccio
npm i @nebulr-group/nblocks-react@3
npm i @nebulr-group/nblocks-react@alpha --registry http://verdaccio:4873

```

## Support matrix

| React |  Node  | Supported |
|:-----|:--------:|------:|
| 18.0.0   | 20.0 | **Yes** |
| 17.0.0   | 16.0  |   **Yes** |
| 16.14.0   | 16.0 |    **Yes** |
