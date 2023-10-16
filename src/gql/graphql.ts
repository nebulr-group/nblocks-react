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
  azureAdSsoEnabled?: Maybe<Scalars['Boolean']>;
  googleSsoEnabled?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  onboardingFlow?: Maybe<Scalars['String']>;
  passkeysEnabled?: Maybe<Scalars['Boolean']>;
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
  priceOffer?: InputMaybe<PriceOfferInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTenantAnonymous: Tenant;
  /** This will create a new user for a tenant. */
  createUsers: Array<User>;
  deleteUser: Scalars['Boolean'];
  sendPasswordResetLink: Scalars['Boolean'];
  /** Sets a single tenants payment details */
  setTenantPlanDetails: TenantPaymentDetailsGraphql;
  /** Update current user */
  updateMe: User;
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


export type MutationSetTenantPlanDetailsArgs = {
  details: SetTenantPlanDetailsInput;
};


export type MutationUpdateMeArgs = {
  user: UserInput;
};


export type MutationUpdateTenantArgs = {
  tenant: TenantInput;
};


export type MutationUpdateUserArgs = {
  user: UserInput;
};

export type PaymentOptionsGraphql = {
  __typename?: 'PaymentOptionsGraphql';
  plans?: Maybe<Array<PlanGraphql>>;
  taxes?: Maybe<Array<TaxGraphql>>;
};

export type PlanGraphql = {
  __typename?: 'PlanGraphql';
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  key: Scalars['String'];
  name: Scalars['String'];
  prices: Array<PriceGraphql>;
  trial: Scalars['Boolean'];
  trialDays: Scalars['Float'];
};

export type PriceGraphql = {
  __typename?: 'PriceGraphql';
  amount: Scalars['Float'];
  currency: Scalars['String'];
  recurrenceInterval: Scalars['String'];
};

export type PriceOfferInput = {
  currency: Scalars['String'];
  recurrenceInterval: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Gets useful App configs for the UI to consume */
  getAppAnonymous: App;
  /** Get current user */
  getMe: User;
  getPaymentOptionsAnonymous: PaymentOptionsGraphql;
  /** Gets a single tenant */
  getTenant: Tenant;
  getTenantAnonymous: TenantAnonymous;
  /** Gets a single tenants payment details */
  getTenantPaymentDetails: TenantPaymentDetailsGraphql;
  /** List all available user roles that the current user can assign others */
  listUserRoles: Array<Scalars['String']>;
  /** List all users in this tenant. */
  listUsers: Array<User>;
};

export type SetTenantPlanDetailsInput = {
  planKey: Scalars['String'];
  priceOffer: PriceOfferInput;
};

export type TaxGraphql = {
  __typename?: 'TaxGraphql';
  countryCode: Scalars['String'];
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  percentage: Scalars['Float'];
};

export type Tenant = {
  __typename?: 'Tenant';
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  logo: Scalars['String'];
  mfa?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  onboarded?: Maybe<Scalars['Boolean']>;
  paymentStatus?: Maybe<TenantPaymentStatusGraphql>;
  plan?: Maybe<Scalars['String']>;
  trial?: Maybe<Scalars['Boolean']>;
};

export type TenantAnonymous = {
  __typename?: 'TenantAnonymous';
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type TenantInput = {
  locale?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  mfa?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type TenantOwnerInput = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type TenantPaymentDetailsGraphql = {
  __typename?: 'TenantPaymentDetailsGraphql';
  details: TenantPlanDetailsGraphql;
  status: TenantPaymentStatusGraphql;
};

export type TenantPaymentStatusGraphql = {
  __typename?: 'TenantPaymentStatusGraphql';
  paymentsEnabled: Scalars['Boolean'];
  provider: Scalars['String'];
  shouldSelectPlan: Scalars['Boolean'];
  shouldSetupPayments: Scalars['Boolean'];
};

export type TenantPlanDetailsGraphql = {
  __typename?: 'TenantPlanDetailsGraphql';
  plan?: Maybe<PlanGraphql>;
  price?: Maybe<PriceGraphql>;
  trial: Scalars['Boolean'];
  trialDaysLeft: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  firstName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
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


export type CreateUsersMutation = { __typename?: 'Mutation', createUsers: Array<{ __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, fullName?: string | null, email?: string | null, username?: string | null, createdAt?: string | null, onboarded?: boolean | null, enabled?: boolean | null, role?: string | null, teams?: Array<string> | null }> };

export type DeleteUserMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getMe: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, fullName?: string | null, email?: string | null, username?: string | null, createdAt?: string | null, onboarded?: boolean | null, enabled?: boolean | null, role?: string | null, teams?: Array<string> | null } };

export type GetTenantQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTenantQuery = { __typename?: 'Query', getTenant: { __typename?: 'Tenant', createdAt?: string | null, id: string, logo: string, locale?: string | null, mfa?: boolean | null, name: string, onboarded?: boolean | null, plan?: string | null, paymentStatus?: { __typename?: 'TenantPaymentStatusGraphql', shouldSelectPlan: boolean, shouldSetupPayments: boolean, paymentsEnabled: boolean, provider: string } | null } };

export type GetTenantAnonymousQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTenantAnonymousQuery = { __typename?: 'Query', getTenantAnonymous: { __typename?: 'TenantAnonymous', id: string, locale?: string | null, name?: string | null } };

export type ListUserRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListUserRolesQuery = { __typename?: 'Query', listUserRoles: Array<string> };

export type ListUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type ListUsersQuery = { __typename?: 'Query', listUsers: Array<{ __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, fullName?: string | null, email?: string | null, username?: string | null, createdAt?: string | null, onboarded?: boolean | null, enabled?: boolean | null, role?: string | null, teams?: Array<string> | null }> };

export type SendPasswordResetLinkMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type SendPasswordResetLinkMutation = { __typename?: 'Mutation', sendPasswordResetLink: boolean };

export type UpdateMeMutationVariables = Exact<{
  user: UserInput;
}>;


export type UpdateMeMutation = { __typename?: 'Mutation', updateMe: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, fullName?: string | null, email?: string | null, username?: string | null, createdAt?: string | null, onboarded?: boolean | null, enabled?: boolean | null, role?: string | null, teams?: Array<string> | null } };

export type UpdateTenantMutationVariables = Exact<{
  tenant: TenantInput;
}>;


export type UpdateTenantMutation = { __typename?: 'Mutation', updateTenant: { __typename?: 'Tenant', createdAt?: string | null, id: string, logo: string, locale?: string | null, mfa?: boolean | null, name: string, plan?: string | null, paymentStatus?: { __typename?: 'TenantPaymentStatusGraphql', shouldSelectPlan: boolean, shouldSetupPayments: boolean, paymentsEnabled: boolean, provider: string } | null } };

export type UpdateUserMutationVariables = Exact<{
  user: UserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, fullName?: string | null, email?: string | null, username?: string | null, createdAt?: string | null, onboarded?: boolean | null, enabled?: boolean | null, role?: string | null, teams?: Array<string> | null } };

export type GetPaymentOptionsAnonymousQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPaymentOptionsAnonymousQuery = { __typename?: 'Query', getPaymentOptionsAnonymous: { __typename?: 'PaymentOptionsGraphql', plans?: Array<{ __typename?: 'PlanGraphql', id: string, name: string, key: string, description?: string | null, trial: boolean, trialDays: number, prices: Array<{ __typename?: 'PriceGraphql', amount: number, currency: string, recurrenceInterval: string }> }> | null, taxes?: Array<{ __typename?: 'TaxGraphql', id: string, name: string, countryCode: string, percentage: number }> | null } };

export type GetTenantPaymentDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTenantPaymentDetailsQuery = { __typename?: 'Query', getTenantPaymentDetails: { __typename?: 'TenantPaymentDetailsGraphql', status: { __typename?: 'TenantPaymentStatusGraphql', shouldSelectPlan: boolean, shouldSetupPayments: boolean, paymentsEnabled: boolean, provider: string }, details: { __typename?: 'TenantPlanDetailsGraphql', trial: boolean, trialDaysLeft: number, plan?: { __typename?: 'PlanGraphql', id: string, name: string, key: string, description?: string | null, trial: boolean, trialDays: number, prices: Array<{ __typename?: 'PriceGraphql', amount: number, currency: string, recurrenceInterval: string }> } | null, price?: { __typename?: 'PriceGraphql', amount: number, currency: string, recurrenceInterval: string } | null } } };

export type SetTenantPlanDetailsMutationVariables = Exact<{
  details: SetTenantPlanDetailsInput;
}>;


export type SetTenantPlanDetailsMutation = { __typename?: 'Mutation', setTenantPlanDetails: { __typename?: 'TenantPaymentDetailsGraphql', status: { __typename?: 'TenantPaymentStatusGraphql', shouldSelectPlan: boolean, shouldSetupPayments: boolean, paymentsEnabled: boolean, provider: string }, details: { __typename?: 'TenantPlanDetailsGraphql', trial: boolean, trialDaysLeft: number, plan?: { __typename?: 'PlanGraphql', id: string, name: string, key: string, description?: string | null, trial: boolean, trialDays: number, prices: Array<{ __typename?: 'PriceGraphql', amount: number, currency: string, recurrenceInterval: string }> } | null, price?: { __typename?: 'PriceGraphql', amount: number, currency: string, recurrenceInterval: string } | null } } };

export type GetAppAnonymousQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAppAnonymousQuery = { __typename?: 'Query', getAppAnonymous: { __typename?: 'App', name?: string | null, logo?: string | null, privacyPolicyUrl?: string | null, termsOfServiceUrl?: string | null, onboardingFlow?: string | null, passkeysEnabled?: boolean | null, azureAdSsoEnabled?: boolean | null, googleSsoEnabled?: boolean | null } };


export const CreateTenantAnonymousDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTenantAnonymous"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tenant"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTenantInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTenantAnonymous"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tenant"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tenant"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"plan"}},{"kind":"Field","name":{"kind":"Name","value":"mfa"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateTenantAnonymousMutation, CreateTenantAnonymousMutationVariables>;
export const CreateUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userNames"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userNames"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userNames"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"onboarded"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"teams"}}]}}]}}]} as unknown as DocumentNode<CreateUsersMutation, CreateUsersMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"onboarded"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"teams"}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
export const GetTenantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTenant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTenant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"mfa"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"onboarded"}},{"kind":"Field","name":{"kind":"Name","value":"plan"}},{"kind":"Field","name":{"kind":"Name","value":"paymentStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shouldSelectPlan"}},{"kind":"Field","name":{"kind":"Name","value":"shouldSetupPayments"}},{"kind":"Field","name":{"kind":"Name","value":"paymentsEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}}]}}]}}]}}]} as unknown as DocumentNode<GetTenantQuery, GetTenantQueryVariables>;
export const GetTenantAnonymousDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTenantAnonymous"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTenantAnonymous"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetTenantAnonymousQuery, GetTenantAnonymousQueryVariables>;
export const ListUserRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListUserRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listUserRoles"}}]}}]} as unknown as DocumentNode<ListUserRolesQuery, ListUserRolesQueryVariables>;
export const ListUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"onboarded"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"teams"}}]}}]}}]} as unknown as DocumentNode<ListUsersQuery, ListUsersQueryVariables>;
export const SendPasswordResetLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendPasswordResetLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendPasswordResetLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<SendPasswordResetLinkMutation, SendPasswordResetLinkMutationVariables>;
export const UpdateMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"onboarded"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"teams"}}]}}]}}]} as unknown as DocumentNode<UpdateMeMutation, UpdateMeMutationVariables>;
export const UpdateTenantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTenant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tenant"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TenantInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTenant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tenant"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tenant"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"mfa"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"plan"}},{"kind":"Field","name":{"kind":"Name","value":"paymentStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shouldSelectPlan"}},{"kind":"Field","name":{"kind":"Name","value":"shouldSetupPayments"}},{"kind":"Field","name":{"kind":"Name","value":"paymentsEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTenantMutation, UpdateTenantMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"onboarded"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"teams"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetPaymentOptionsAnonymousDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPaymentOptionsAnonymous"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPaymentOptionsAnonymous"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"trial"}},{"kind":"Field","name":{"kind":"Name","value":"trialDays"}},{"kind":"Field","name":{"kind":"Name","value":"prices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"recurrenceInterval"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"taxes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"countryCode"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}}]}}]}}]}}]} as unknown as DocumentNode<GetPaymentOptionsAnonymousQuery, GetPaymentOptionsAnonymousQueryVariables>;
export const GetTenantPaymentDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTenantPaymentDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTenantPaymentDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shouldSelectPlan"}},{"kind":"Field","name":{"kind":"Name","value":"shouldSetupPayments"}},{"kind":"Field","name":{"kind":"Name","value":"paymentsEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}}]}},{"kind":"Field","name":{"kind":"Name","value":"details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"trial"}},{"kind":"Field","name":{"kind":"Name","value":"trialDays"}},{"kind":"Field","name":{"kind":"Name","value":"prices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"recurrenceInterval"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"recurrenceInterval"}}]}},{"kind":"Field","name":{"kind":"Name","value":"trial"}},{"kind":"Field","name":{"kind":"Name","value":"trialDaysLeft"}}]}}]}}]}}]} as unknown as DocumentNode<GetTenantPaymentDetailsQuery, GetTenantPaymentDetailsQueryVariables>;
export const SetTenantPlanDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetTenantPlanDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"details"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SetTenantPlanDetailsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setTenantPlanDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"details"},"value":{"kind":"Variable","name":{"kind":"Name","value":"details"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shouldSelectPlan"}},{"kind":"Field","name":{"kind":"Name","value":"shouldSetupPayments"}},{"kind":"Field","name":{"kind":"Name","value":"paymentsEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}}]}},{"kind":"Field","name":{"kind":"Name","value":"details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"trial"}},{"kind":"Field","name":{"kind":"Name","value":"trialDays"}},{"kind":"Field","name":{"kind":"Name","value":"prices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"recurrenceInterval"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"recurrenceInterval"}}]}},{"kind":"Field","name":{"kind":"Name","value":"trial"}},{"kind":"Field","name":{"kind":"Name","value":"trialDaysLeft"}}]}}]}}]}}]} as unknown as DocumentNode<SetTenantPlanDetailsMutation, SetTenantPlanDetailsMutationVariables>;
export const GetAppAnonymousDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAppAnonymous"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAppAnonymous"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"privacyPolicyUrl"}},{"kind":"Field","name":{"kind":"Name","value":"termsOfServiceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"onboardingFlow"}},{"kind":"Field","name":{"kind":"Name","value":"passkeysEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"azureAdSsoEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"googleSsoEnabled"}}]}}]}}]} as unknown as DocumentNode<GetAppAnonymousQuery, GetAppAnonymousQueryVariables>;