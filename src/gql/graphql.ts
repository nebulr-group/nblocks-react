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

export type AppConfig = {
  __typename?: 'AppConfig';
  apiUrl?: Maybe<Scalars['String']>;
  businessModel?: Maybe<BusinessModelGraphql>;
  defaultRole?: Maybe<Scalars['String']>;
  emailSenderEmail?: Maybe<Scalars['String']>;
  emailSenderName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  privacyPolicyUrl?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Scalars['String']>>;
  termsOfServiceUrl?: Maybe<Scalars['String']>;
  uiUrl?: Maybe<Scalars['String']>;
  websiteUrl?: Maybe<Scalars['String']>;
};

export type BusinessModelGraphql = {
  __typename?: 'BusinessModelGraphql';
  plans: Array<PlanGraphql>;
  taxes: Array<TaxGraphql>;
};

export type CheckoutResponse = {
  __typename?: 'CheckoutResponse';
  /** A checkout ID to create a `Stripe` checkout form */
  id: Scalars['String'];
  /** Use this key to initiate a Stripe client and use the `id` property to start checkoutSession */
  publicKey: Scalars['String'];
};

export type CreateCheckoutSessionInput = {
  /** The plan the customer which to checkout */
  plan: Scalars['String'];
  /** If there's multi region plans you need to provide the region to fetch the correct currencies and taxes */
  region?: InputMaybe<Scalars['String']>;
};

export type CreateTenantInput = {
  logo?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  owner: TenantOwnerInput;
  plan?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCheckoutSession: CheckoutResponse;
  createTenantAnonymous: Tenant;
  /** This will create a new user for a tenant. */
  createUsers: Array<User>;
  deleteUser: Scalars['Boolean'];
  sendPasswordResetLink: Scalars['Boolean'];
  updateAppCredentials: Scalars['Boolean'];
  updateTenant: Tenant;
  /** Update the user. You can change role, teams and also enable or disable the user from logging in. */
  updateUser: User;
};


export type MutationCreateCheckoutSessionArgs = {
  args: CreateCheckoutSessionInput;
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


export type MutationUpdateAppCredentialsArgs = {
  credentials: UpdateCredentialsInput;
};


export type MutationUpdateTenantArgs = {
  tenant: TenantInput;
};


export type MutationUpdateUserArgs = {
  user: UserInput;
};

export type PlanGraphql = {
  __typename?: 'PlanGraphql';
  name: Scalars['String'];
  prices: Array<PriceGraphql>;
};

export type PriceGraphql = {
  __typename?: 'PriceGraphql';
  amount: Scalars['Float'];
  currency: Scalars['String'];
  region: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Gets useful App configs for the UI to consume */
  getAppAnonymous: App;
  /** A bunch of more secret properties to render for the app config screen used by developer during quickstart */
  getAppConfig: AppConfig;
  /** Gets the apps plan. Use this to display pricing instead of the AppConfig resolver */
  getAppPlans: Array<PlanGraphql>;
  /** Obtain an short lived session url to redirect or present the user its Stripe subscription panel for updating payment or subscription data. */
  getCustomerPortal: Scalars['String'];
  /** Gets a single tenant */
  getTenant: Tenant;
  getTenantAnonymous: TenantAnonymous;
  /** List all available user roles that the current user can assign others */
  listUserRoles: Array<Scalars['String']>;
  /** List all users in this tenant. */
  listUsers: Array<User>;
};

export type TaxGraphql = {
  __typename?: 'TaxGraphql';
  name: Scalars['String'];
  percentage: Scalars['Float'];
  region: Scalars['String'];
};

export type Tenant = {
  __typename?: 'Tenant';
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  logo: Scalars['String'];
  mfa?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  paymentsEnabled?: Maybe<Scalars['Boolean']>;
  paymentsRequired?: Maybe<Scalars['Boolean']>;
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

export type UpdateCredentialsInput = {
  stripePublicKey?: InputMaybe<Scalars['String']>;
  stripeSecretKey?: InputMaybe<Scalars['String']>;
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

export type CreateCheckoutSessionMutationVariables = Exact<{
  args: CreateCheckoutSessionInput;
}>;


export type CreateCheckoutSessionMutation = { __typename?: 'Mutation', createCheckoutSession: { __typename?: 'CheckoutResponse', id: string, publicKey: string } };

export type CreateTenantAnonymousMutationVariables = Exact<{
  tenant: CreateTenantInput;
}>;


export type CreateTenantAnonymousMutation = { __typename?: 'Mutation', createTenantAnonymous: { __typename?: 'Tenant', id: string, name: string, locale?: string | null, logo: string, plan?: string | null, mfa?: boolean | null, createdAt?: string | null } };

export type GetAppConfigQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAppConfigQuery = { __typename?: 'Query', getAppConfig: { __typename?: 'AppConfig', apiUrl?: string | null, defaultRole?: string | null, emailSenderEmail?: string | null, emailSenderName?: string | null, id?: string | null, logo?: string | null, name?: string | null, privacyPolicyUrl?: string | null, roles?: Array<string> | null, termsOfServiceUrl?: string | null, uiUrl?: string | null, websiteUrl?: string | null, businessModel?: { __typename?: 'BusinessModelGraphql', taxes: Array<{ __typename?: 'TaxGraphql', name: string, percentage: number, region: string }>, plans: Array<{ __typename?: 'PlanGraphql', name: string, prices: Array<{ __typename?: 'PriceGraphql', amount: number, currency: string, region: string }> }> } | null } };

export type GetAppPlansQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAppPlansQuery = { __typename?: 'Query', getAppPlans: Array<{ __typename?: 'PlanGraphql', name: string, prices: Array<{ __typename?: 'PriceGraphql', amount: number, currency: string, region: string }> }> };

export type UpdateAppCredentialsQueryVariables = Exact<{
  credentials: UpdateCredentialsInput;
}>;


export type UpdateAppCredentialsQuery = { __typename?: 'Query', updateAppCredentials: boolean };

export type CreateUsersMutationVariables = Exact<{
  userNames: Array<Scalars['String']> | Scalars['String'];
}>;


export type CreateUsersMutation = { __typename?: 'Mutation', createUsers: Array<{ __typename?: 'User', id: string, fullName?: string | null, email?: string | null, username?: string | null, createdAt?: string | null, onboarded?: boolean | null, enabled?: boolean | null, role?: string | null, teams?: Array<string> | null }> };

export type DeleteUserMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type GetTenantQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTenantQuery = { __typename?: 'Query', getTenant: { __typename?: 'Tenant', createdAt?: string | null, id: string, logo: string, locale?: string | null, mfa?: boolean | null, paymentsEnabled?: boolean | null, paymentsRequired?: boolean | null, name: string, plan?: string | null } };

export type GetTenantAnonymousQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTenantAnonymousQuery = { __typename?: 'Query', getTenantAnonymous: { __typename?: 'TenantAnonymous', id: string, locale?: string | null, name?: string | null } };

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


export const CreateCheckoutSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCheckoutSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"args"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCheckoutSessionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCheckoutSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"args"},"value":{"kind":"Variable","name":{"kind":"Name","value":"args"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}}]}}]} as unknown as DocumentNode<CreateCheckoutSessionMutation, CreateCheckoutSessionMutationVariables>;
export const CreateTenantAnonymousDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTenantAnonymous"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tenant"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTenantInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTenantAnonymous"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tenant"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tenant"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"plan"}},{"kind":"Field","name":{"kind":"Name","value":"mfa"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateTenantAnonymousMutation, CreateTenantAnonymousMutationVariables>;
export const GetAppConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAppConfig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAppConfig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiUrl"}},{"kind":"Field","name":{"kind":"Name","value":"defaultRole"}},{"kind":"Field","name":{"kind":"Name","value":"emailSenderEmail"}},{"kind":"Field","name":{"kind":"Name","value":"emailSenderName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"businessModel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taxes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"region"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"prices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"privacyPolicyUrl"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"termsOfServiceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"uiUrl"}},{"kind":"Field","name":{"kind":"Name","value":"websiteUrl"}}]}}]}}]} as unknown as DocumentNode<GetAppConfigQuery, GetAppConfigQueryVariables>;
export const GetAppPlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAppPlans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAppConfig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"businessModel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"prices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAppPlansQuery, GetAppPlansQueryVariables>;
export const UpdateAppCredentialsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UpdateAppCredentials"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"credentials"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCredentialsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAppCredentials"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"credentials"},"value":{"kind":"Variable","name":{"kind":"Name","value":"credentials"}}}]}]}}]} as unknown as DocumentNode<UpdateAppCredentialsQuery, UpdateAppCredentialsQueryVariables>;
export const CreateUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userNames"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userNames"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userNames"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"onboarded"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"teams"}}]}}]}}]} as unknown as DocumentNode<CreateUsersMutation, CreateUsersMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const GetTenantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTenant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTenant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"mfa"}},{"kind":"Field","name":{"kind":"Name","value":"paymentsEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"paymentsRequired"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"plan"}}]}}]}}]} as unknown as DocumentNode<GetTenantQuery, GetTenantQueryVariables>;
export const GetTenantAnonymousDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTenantAnonymous"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTenantAnonymous"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetTenantAnonymousQuery, GetTenantAnonymousQueryVariables>;
export const ListUserRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListUserRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listUserRoles"}}]}}]} as unknown as DocumentNode<ListUserRolesQuery, ListUserRolesQueryVariables>;
export const ListUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"onboarded"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"teams"}}]}}]}}]} as unknown as DocumentNode<ListUsersQuery, ListUsersQueryVariables>;
export const SendPasswordResetLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendPasswordResetLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendPasswordResetLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<SendPasswordResetLinkMutation, SendPasswordResetLinkMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"onboarded"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"teams"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetAppAnonymousDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAppAnonymous"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAppAnonymous"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"privacyPolicyUrl"}},{"kind":"Field","name":{"kind":"Name","value":"termsOfServiceUrl"}}]}}]}}]} as unknown as DocumentNode<GetAppAnonymousQuery, GetAppAnonymousQueryVariables>;