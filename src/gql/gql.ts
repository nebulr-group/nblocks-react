/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "query GetAppAnonymous {\n  getAppAnonymous {\n    name\n    logo\n    privacyPolicyUrl\n    termsOfServiceUrl\n  }\n}": types.GetAppAnonymousDocument,
};

export function graphql(source: "query GetAppAnonymous {\n  getAppAnonymous {\n    name\n    logo\n    privacyPolicyUrl\n    termsOfServiceUrl\n  }\n}"): (typeof documents)["query GetAppAnonymous {\n  getAppAnonymous {\n    name\n    logo\n    privacyPolicyUrl\n    termsOfServiceUrl\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;