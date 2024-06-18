# nblocks-react

Welcome to NBlocks, the platform toolbox from Nebulr made by developers for developers. If you're new to this concept, head over to our site and check out the capabilities.

[nblocks.dev](https://nblocks.dev)

## Support matrix

| React |  Node  | Supported |
|:-----|:--------:|------:|
| 18.0.0   | 20.0 | **Yes** |
| 17.0.0   | 16.0  |   **Yes** |
| 16.14.0   | 16.0 |    **Yes** |


# Installing

## Stable

```
npm i @nebulr-group/nblocks-react
```

## Beta

```
npm i @nebulr-group/nblocks-react@beta
```

## Alpha (local Verdaccio)

```
npm i @nebulr-group/nblocks-react@alpha --registry http://verdaccio:4873
```

# Publishing

Publishing is handled by Github actions.

## Publish stable version (NPM)

```
yarn npm-publish
```

## Publish beta version (NPM)

Versions are tagged as beta and should be suffixed with `-beta.X`, e.g. `3.0.0-beta.4`

```
yarn npm-publish-beta
```

## Publish alpha version (local Verdaccio)

Versions are tagged as alpha and should be suffixed with `-alpha.X`, e.g. `3.0.0-alpha.4`

```
yarn npm-publish-local
```

# Running and Development

Start example project on port 3000

```
npm run build
cd example-app
npm run start
```

Thanks to https://blog.logrocket.com/how-to-build-component-library-react-typescript for a great starting point!