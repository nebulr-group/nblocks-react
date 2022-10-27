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
  email: Scalars['String'];
  logo?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  plan: Scalars['String'];
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

export type GetAppAnonymousQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAppAnonymousQuery = { __typename?: 'Query', getAppAnonymous: { __typename?: 'App', name?: string | null, logo?: string | null, privacyPolicyUrl?: string | null, termsOfServiceUrl?: string | null } };


export const GetAppAnonymousDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAppAnonymous"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAppAnonymous"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"privacyPolicyUrl"}},{"kind":"Field","name":{"kind":"Name","value":"termsOfServiceUrl"}}]}}]}}]} as unknown as DocumentNode<GetAppAnonymousQuery, GetAppAnonymousQueryVariables>;