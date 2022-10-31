/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "mutation CreateTenantAnonymous($tenant: CreateTenantInput!) {\n  createTenantAnonymous(tenant: $tenant) {\n    id\n    name\n    locale\n    logo\n    plan\n    mfa\n    createdAt\n  }\n}": types.CreateTenantAnonymousDocument,
    "query GetAppAnonymous {\n  getAppAnonymous {\n    name\n    logo\n    privacyPolicyUrl\n    termsOfServiceUrl\n  }\n}": types.GetAppAnonymousDocument,
};

export function graphql(source: "mutation CreateTenantAnonymous($tenant: CreateTenantInput!) {\n  createTenantAnonymous(tenant: $tenant) {\n    id\n    name\n    locale\n    logo\n    plan\n    mfa\n    createdAt\n  }\n}"): (typeof documents)["mutation CreateTenantAnonymous($tenant: CreateTenantInput!) {\n  createTenantAnonymous(tenant: $tenant) {\n    id\n    name\n    locale\n    logo\n    plan\n    mfa\n    createdAt\n  }\n}"];
export function graphql(source: "query GetAppAnonymous {\n  getAppAnonymous {\n    name\n    logo\n    privacyPolicyUrl\n    termsOfServiceUrl\n  }\n}"): (typeof documents)["query GetAppAnonymous {\n  getAppAnonymous {\n    name\n    logo\n    privacyPolicyUrl\n    termsOfServiceUrl\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;