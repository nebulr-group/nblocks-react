/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type App = {
  __typename?: 'App';
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  privacyPolicyUrl?: Maybe<Scalars['String']>;
  termsOfServiceUrl?: Maybe<Scalars['String']>;
  uiUrl?: Maybe<Scalars['String']>;
  websiteUrl?: Maybe<Scalars['String']>;
};

export type CreateTenantInput = {
  logo?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  owner: TenantOwnerInput;
  plan?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTenantAnonymous: Tenant;
  /** This will create a new user for a tenant. */
  createUsers: Array<User>;
  deleteUser: Scalars['Boolean'];
  sendPasswordResetLink: Scalars['Boolean'];
  updateTenant: Tenant;
  /** Update the user. You can change role, teams and also enable or disable the user from logging in. */
  updateUser: User;
};


export type MutationCreateTenantAnonymousArgs = {
  tenant: CreateTenantInput;
};


export type MutationCreateUsersArgs = {
  userNames: Array<Scalars['String']>;
};


export type MutationDeleteUserArgs = {
  userId: Scalars['String'];
};


export type MutationSendPasswordResetLinkArgs = {
  userId: Scalars['String'];
};


export type MutationUpdateTenantArgs = {
  tenant: TenantInput;
};


export type MutationUpdateUserArgs = {
  user: UserInput;
};

export type Query = {
  __typename?: 'Query';
  /** Gets useful App configs for the UI to consume */
  getAppAnonymous: App;
  /** Obtain an short lived session url to redirect or present the user its Stripe subscription panel for updating payment or subscription data. */
  getCustomerPortal: Scalars['String'];
  /** Gets a single tenant */
  getTenant: Tenant;
  getTenantAnonymous: TenantAnonymous;
  /** Lists all tenants */
  listTenants: Array<Tenant>;
  /** List all available user roles that the current user can assign others */
  listUserRoles: Array<Scalars['String']>;
  /** List all users in this tenant. */
  listUsers: Array<User>;
};

export type Tenant = {
  __typename?: 'Tenant';
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  logo: Scalars['String'];
  mfa?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  plan?: Maybe<Scalars['String']>;
};

export type TenantAnonymous = {
  __typename?: 'TenantAnonymous';
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type TenantInput = {
  locale?: InputMaybe<Scalars['String']>;
  mfa?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  plan?: InputMaybe<Scalars['String']>;
};

export type TenantOwnerInput = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  onboarded?: Maybe<Scalars['Boolean']>;
  role?: Maybe<Scalars['String']>;
  teams?: Maybe<Array<Scalars['String']>>;
  username?: Maybe<Scalars['String']>;
};

export type UserInput = {
  enabled?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['String'];
  role?: InputMaybe<Scalars['String']>;
};

export type CreateTenantAnonymousMutationVariables = Exact<{
  tenant: CreateTenantInput;
}>;


export type CreateTenantAnonymousMutation = { __typename?: 'Mutation', createTenantAnonymous: { __typename?: 'Tenant', id: string, name: string, locale?: string | null, logo: string, plan?: string | null, mfa?: boolean | null, createdAt?: string | null } };

export type CreateUsersMutationVariables = Exact<{
  userNames: Array<Scalars['String']> | Scalars['String'];
}>;


export type CreateUsersMutation = { __typename?: 'Mutation', createUsers: Array<{ __typename?: 'User', id: string, fullName?: string | null, email?: string | null, username?: string | null, createdAt?: string | null, onboarded?: boolean | null, enabled?: boolean | null, role?: string | null, teams?: Array<string> | null }> };

export type DeleteUserMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type ListUserRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListUserRolesQuery = { __typename?: 'Query', listUserRoles: Array<string> };

export type ListUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type ListUsersQuery = { __typename?: 'Query', listUsers: Array<{ __typename?: 'User', id: string, fullName?: string | null, email?: string | null, username?: string | null, createdAt?: string | null, onboarded?: boolean | null, enabled?: boolean | null, role?: string | null, teams?: Array<string> | null }> };

export type SendPasswordResetLinkMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type SendPasswordResetLinkMutation = { __typename?: 'Mutation', sendPasswordResetLink: boolean };

export type UpdateUserMutationVariables = Exact<{
  user: UserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, fullName?: string | null, email?: string | null, username?: string | null, createdAt?: string | null, onboarded?: boolean | null, enabled?: boolean | null, role?: string | null, teams?: Array<string> | null } };

export type GetAppAnonymousQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAppAnonymousQuery = { __typename?: 'Query', getAppAnonymous: { __typename?: 'App', name?: string | null, logo?: string | null, privacyPolicyUrl?: string | null, termsOfServiceUrl?: string | null } };


export const CreateTenantAnonymousDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTenantAnonymous"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tenant"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTenantInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTenantAnonymous"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tenant"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tenant"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"plan"}},{"kind":"Field","name":{"kind":"Name","value":"mfa"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateTenantAnonymousMutation, CreateTenantAnonymousMutationVariables>;
export const CreateUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userNames"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userNames"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userNames"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"onboarded"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"teams"}}]}}]}}]} as unknown as DocumentNode<CreateUsersMutation, CreateUsersMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const ListUserRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListUserRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listUserRoles"}}]}}]} as unknown as DocumentNode<ListUserRolesQuery, ListUserRolesQueryVariables>;
export const ListUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"onboarded"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"teams"}}]}}]}}]} as unknown as DocumentNode<ListUsersQuery, ListUsersQueryVariables>;
export const SendPasswordResetLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendPasswordResetLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendPasswordResetLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<SendPasswordResetLinkMutation, SendPasswordResetLinkMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"onboarded"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"teams"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetAppAnonymousDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAppAnonymous"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAppAnonymous"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"privacyPolicyUrl"}},{"kind":"Field","name":{"kind":"Name","value":"termsOfServiceUrl"}}]}}]}}]} as unknown as DocumentNode<GetAppAnonymousQuery, GetAppAnonymousQueryVariables>;