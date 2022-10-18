import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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

export type GetCustomerPortalQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomerPortalQuery = { __typename?: 'Query', getCustomerPortal: string };

export type GetTenantQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTenantQuery = { __typename?: 'Query', getTenant: { __typename?: 'Tenant', id: string, name: string, locale?: string | null, logo: string, plan?: string | null, mfa?: boolean | null, createdAt?: string | null } };

export type UpdateTenantMutationVariables = Exact<{
  tenant: TenantInput;
}>;


export type UpdateTenantMutation = { __typename?: 'Mutation', updateTenant: { __typename?: 'Tenant', id: string, name: string, locale?: string | null, logo: string, plan?: string | null, mfa?: boolean | null, createdAt?: string | null } };

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


export const GetCustomerPortalDocument = gql`
    query GetCustomerPortal {
  getCustomerPortal
}
    `;

/**
 * __useGetCustomerPortalQuery__
 *
 * To run a query within a React component, call `useGetCustomerPortalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerPortalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerPortalQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCustomerPortalQuery(baseOptions?: Apollo.QueryHookOptions<GetCustomerPortalQuery, GetCustomerPortalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerPortalQuery, GetCustomerPortalQueryVariables>(GetCustomerPortalDocument, options);
      }
export function useGetCustomerPortalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerPortalQuery, GetCustomerPortalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerPortalQuery, GetCustomerPortalQueryVariables>(GetCustomerPortalDocument, options);
        }
export type GetCustomerPortalQueryHookResult = ReturnType<typeof useGetCustomerPortalQuery>;
export type GetCustomerPortalLazyQueryHookResult = ReturnType<typeof useGetCustomerPortalLazyQuery>;
export type GetCustomerPortalQueryResult = Apollo.QueryResult<GetCustomerPortalQuery, GetCustomerPortalQueryVariables>;
export const GetTenantDocument = gql`
    query GetTenant {
  getTenant {
    id
    name
    locale
    logo
    plan
    mfa
    createdAt
  }
}
    `;

/**
 * __useGetTenantQuery__
 *
 * To run a query within a React component, call `useGetTenantQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTenantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTenantQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTenantQuery(baseOptions?: Apollo.QueryHookOptions<GetTenantQuery, GetTenantQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTenantQuery, GetTenantQueryVariables>(GetTenantDocument, options);
      }
export function useGetTenantLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTenantQuery, GetTenantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTenantQuery, GetTenantQueryVariables>(GetTenantDocument, options);
        }
export type GetTenantQueryHookResult = ReturnType<typeof useGetTenantQuery>;
export type GetTenantLazyQueryHookResult = ReturnType<typeof useGetTenantLazyQuery>;
export type GetTenantQueryResult = Apollo.QueryResult<GetTenantQuery, GetTenantQueryVariables>;
export const UpdateTenantDocument = gql`
    mutation UpdateTenant($tenant: TenantInput!) {
  updateTenant(tenant: $tenant) {
    id
    name
    locale
    logo
    plan
    mfa
    createdAt
  }
}
    `;
export type UpdateTenantMutationFn = Apollo.MutationFunction<UpdateTenantMutation, UpdateTenantMutationVariables>;

/**
 * __useUpdateTenantMutation__
 *
 * To run a mutation, you first call `useUpdateTenantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTenantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTenantMutation, { data, loading, error }] = useUpdateTenantMutation({
 *   variables: {
 *      tenant: // value for 'tenant'
 *   },
 * });
 */
export function useUpdateTenantMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTenantMutation, UpdateTenantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTenantMutation, UpdateTenantMutationVariables>(UpdateTenantDocument, options);
      }
export type UpdateTenantMutationHookResult = ReturnType<typeof useUpdateTenantMutation>;
export type UpdateTenantMutationResult = Apollo.MutationResult<UpdateTenantMutation>;
export type UpdateTenantMutationOptions = Apollo.BaseMutationOptions<UpdateTenantMutation, UpdateTenantMutationVariables>;
export const CreateUsersDocument = gql`
    mutation CreateUsers($userNames: [String!]!) {
  createUsers(userNames: $userNames) {
    id
    fullName
    email
    username
    createdAt
    onboarded
    enabled
    role
    teams
  }
}
    `;
export type CreateUsersMutationFn = Apollo.MutationFunction<CreateUsersMutation, CreateUsersMutationVariables>;

/**
 * __useCreateUsersMutation__
 *
 * To run a mutation, you first call `useCreateUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUsersMutation, { data, loading, error }] = useCreateUsersMutation({
 *   variables: {
 *      userNames: // value for 'userNames'
 *   },
 * });
 */
export function useCreateUsersMutation(baseOptions?: Apollo.MutationHookOptions<CreateUsersMutation, CreateUsersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUsersMutation, CreateUsersMutationVariables>(CreateUsersDocument, options);
      }
export type CreateUsersMutationHookResult = ReturnType<typeof useCreateUsersMutation>;
export type CreateUsersMutationResult = Apollo.MutationResult<CreateUsersMutation>;
export type CreateUsersMutationOptions = Apollo.BaseMutationOptions<CreateUsersMutation, CreateUsersMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($userId: String!) {
  deleteUser(userId: $userId)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const ListUserRolesDocument = gql`
    query ListUserRoles {
  listUserRoles
}
    `;

/**
 * __useListUserRolesQuery__
 *
 * To run a query within a React component, call `useListUserRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListUserRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListUserRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useListUserRolesQuery(baseOptions?: Apollo.QueryHookOptions<ListUserRolesQuery, ListUserRolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListUserRolesQuery, ListUserRolesQueryVariables>(ListUserRolesDocument, options);
      }
export function useListUserRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListUserRolesQuery, ListUserRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListUserRolesQuery, ListUserRolesQueryVariables>(ListUserRolesDocument, options);
        }
export type ListUserRolesQueryHookResult = ReturnType<typeof useListUserRolesQuery>;
export type ListUserRolesLazyQueryHookResult = ReturnType<typeof useListUserRolesLazyQuery>;
export type ListUserRolesQueryResult = Apollo.QueryResult<ListUserRolesQuery, ListUserRolesQueryVariables>;
export const ListUsersDocument = gql`
    query ListUsers {
  listUsers {
    id
    fullName
    email
    username
    createdAt
    onboarded
    enabled
    role
    teams
  }
}
    `;

/**
 * __useListUsersQuery__
 *
 * To run a query within a React component, call `useListUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useListUsersQuery(baseOptions?: Apollo.QueryHookOptions<ListUsersQuery, ListUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, options);
      }
export function useListUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListUsersQuery, ListUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, options);
        }
export type ListUsersQueryHookResult = ReturnType<typeof useListUsersQuery>;
export type ListUsersLazyQueryHookResult = ReturnType<typeof useListUsersLazyQuery>;
export type ListUsersQueryResult = Apollo.QueryResult<ListUsersQuery, ListUsersQueryVariables>;
export const SendPasswordResetLinkDocument = gql`
    mutation SendPasswordResetLink($userId: String!) {
  sendPasswordResetLink(userId: $userId)
}
    `;
export type SendPasswordResetLinkMutationFn = Apollo.MutationFunction<SendPasswordResetLinkMutation, SendPasswordResetLinkMutationVariables>;

/**
 * __useSendPasswordResetLinkMutation__
 *
 * To run a mutation, you first call `useSendPasswordResetLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendPasswordResetLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendPasswordResetLinkMutation, { data, loading, error }] = useSendPasswordResetLinkMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useSendPasswordResetLinkMutation(baseOptions?: Apollo.MutationHookOptions<SendPasswordResetLinkMutation, SendPasswordResetLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendPasswordResetLinkMutation, SendPasswordResetLinkMutationVariables>(SendPasswordResetLinkDocument, options);
      }
export type SendPasswordResetLinkMutationHookResult = ReturnType<typeof useSendPasswordResetLinkMutation>;
export type SendPasswordResetLinkMutationResult = Apollo.MutationResult<SendPasswordResetLinkMutation>;
export type SendPasswordResetLinkMutationOptions = Apollo.BaseMutationOptions<SendPasswordResetLinkMutation, SendPasswordResetLinkMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($user: UserInput!) {
  updateUser(user: $user) {
    id
    fullName
    email
    username
    createdAt
    onboarded
    enabled
    role
    teams
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetAppAnonymousDocument = gql`
    query GetAppAnonymous {
  getAppAnonymous {
    name
    logo
    privacyPolicyUrl
    termsOfServiceUrl
  }
}
    `;

/**
 * __useGetAppAnonymousQuery__
 *
 * To run a query within a React component, call `useGetAppAnonymousQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppAnonymousQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppAnonymousQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAppAnonymousQuery(baseOptions?: Apollo.QueryHookOptions<GetAppAnonymousQuery, GetAppAnonymousQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAppAnonymousQuery, GetAppAnonymousQueryVariables>(GetAppAnonymousDocument, options);
      }
export function useGetAppAnonymousLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAppAnonymousQuery, GetAppAnonymousQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAppAnonymousQuery, GetAppAnonymousQueryVariables>(GetAppAnonymousDocument, options);
        }
export type GetAppAnonymousQueryHookResult = ReturnType<typeof useGetAppAnonymousQuery>;
export type GetAppAnonymousLazyQueryHookResult = ReturnType<typeof useGetAppAnonymousLazyQuery>;
export type GetAppAnonymousQueryResult = Apollo.QueryResult<GetAppAnonymousQuery, GetAppAnonymousQueryVariables>;