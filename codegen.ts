import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  //schema: "http://localhost:3000/graphql",
  schema: "schema.gql",
  documents: ["src/**/*.graphql"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
