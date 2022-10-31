/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "mutation CreateTenantAnonymous($tenant: CreateTenantInput!) {\n  createTenantAnonymous(tenant: $tenant) {\n    id\n    name\n    locale\n    logo\n    plan\n    mfa\n    createdAt\n  }\n}": types.CreateTenantAnonymousDocument,
    "mutation CreateUsers($userNames: [String!]!) {\n  createUsers(userNames: $userNames) {\n    id\n    fullName\n    email\n    username\n    createdAt\n    onboarded\n    enabled\n    role\n    teams\n  }\n}": types.CreateUsersDocument,
    "mutation DeleteUser($userId: String!) {\n  deleteUser(userId: $userId)\n}": types.DeleteUserDocument,
    "query ListUserRoles {\n  listUserRoles\n}": types.ListUserRolesDocument,
    "query ListUsers {\n  listUsers {\n    id\n    fullName\n    email\n    username\n    createdAt\n    onboarded\n    enabled\n    role\n    teams\n  }\n}": types.ListUsersDocument,
    "mutation SendPasswordResetLink($userId: String!) {\n  sendPasswordResetLink(userId: $userId)\n}": types.SendPasswordResetLinkDocument,
    "mutation UpdateUser($user: UserInput!) {\n  updateUser(user: $user) {\n    id\n    fullName\n    email\n    username\n    createdAt\n    onboarded\n    enabled\n    role\n    teams\n  }\n}": types.UpdateUserDocument,
    "query GetAppAnonymous {\n  getAppAnonymous {\n    name\n    logo\n    privacyPolicyUrl\n    termsOfServiceUrl\n  }\n}": types.GetAppAnonymousDocument,
};

export function graphql(source: "mutation CreateTenantAnonymous($tenant: CreateTenantInput!) {\n  createTenantAnonymous(tenant: $tenant) {\n    id\n    name\n    locale\n    logo\n    plan\n    mfa\n    createdAt\n  }\n}"): (typeof documents)["mutation CreateTenantAnonymous($tenant: CreateTenantInput!) {\n  createTenantAnonymous(tenant: $tenant) {\n    id\n    name\n    locale\n    logo\n    plan\n    mfa\n    createdAt\n  }\n}"];
export function graphql(source: "mutation CreateUsers($userNames: [String!]!) {\n  createUsers(userNames: $userNames) {\n    id\n    fullName\n    email\n    username\n    createdAt\n    onboarded\n    enabled\n    role\n    teams\n  }\n}"): (typeof documents)["mutation CreateUsers($userNames: [String!]!) {\n  createUsers(userNames: $userNames) {\n    id\n    fullName\n    email\n    username\n    createdAt\n    onboarded\n    enabled\n    role\n    teams\n  }\n}"];
export function graphql(source: "mutation DeleteUser($userId: String!) {\n  deleteUser(userId: $userId)\n}"): (typeof documents)["mutation DeleteUser($userId: String!) {\n  deleteUser(userId: $userId)\n}"];
export function graphql(source: "query ListUserRoles {\n  listUserRoles\n}"): (typeof documents)["query ListUserRoles {\n  listUserRoles\n}"];
export function graphql(source: "query ListUsers {\n  listUsers {\n    id\n    fullName\n    email\n    username\n    createdAt\n    onboarded\n    enabled\n    role\n    teams\n  }\n}"): (typeof documents)["query ListUsers {\n  listUsers {\n    id\n    fullName\n    email\n    username\n    createdAt\n    onboarded\n    enabled\n    role\n    teams\n  }\n}"];
export function graphql(source: "mutation SendPasswordResetLink($userId: String!) {\n  sendPasswordResetLink(userId: $userId)\n}"): (typeof documents)["mutation SendPasswordResetLink($userId: String!) {\n  sendPasswordResetLink(userId: $userId)\n}"];
export function graphql(source: "mutation UpdateUser($user: UserInput!) {\n  updateUser(user: $user) {\n    id\n    fullName\n    email\n    username\n    createdAt\n    onboarded\n    enabled\n    role\n    teams\n  }\n}"): (typeof documents)["mutation UpdateUser($user: UserInput!) {\n  updateUser(user: $user) {\n    id\n    fullName\n    email\n    username\n    createdAt\n    onboarded\n    enabled\n    role\n    teams\n  }\n}"];
export function graphql(source: "query GetAppAnonymous {\n  getAppAnonymous {\n    name\n    logo\n    privacyPolicyUrl\n    termsOfServiceUrl\n  }\n}"): (typeof documents)["query GetAppAnonymous {\n  getAppAnonymous {\n    name\n    logo\n    privacyPolicyUrl\n    termsOfServiceUrl\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;