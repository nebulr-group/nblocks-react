import React from "react";
import { useQuery } from "@apollo/client";
import { HeadingComponent } from "../components/shared/HeadingComponent";
import {
  GetAppAnonymousDocument,
  GetTenantDocument,
  ListUserRolesDocument,
  ListUsersDocument,
} from "../gql/graphql";

export function GraphqlExpoScreen() {
  const getTenantQuery = useQuery(GetTenantDocument);
  const listUsersQuery = useQuery(ListUsersDocument);
  const listUserRolesQuery = useQuery(ListUserRolesDocument);
  const getAppAnonymousQuery = useQuery(GetAppAnonymousDocument);

  const renderJson = (data?: any) => {
    return data ? <pre>{JSON.stringify(data, null, "\t")}</pre> : "";
  };

  return (
    <div className="space-y-4">
      <HeadingComponent type="h1" size="3xl">
        Queries
      </HeadingComponent>
      <div>
        <HeadingComponent type="h2" size="2xl">
          getTenant.query.graphql (GetTenantDocument)
        </HeadingComponent>
        {renderJson(getTenantQuery.data?.getTenant)}
      </div>
      {/* <div>
        <HeadingComponent type="h2" size="2xl">
          getTenantAnonymous.query.graphql (GetTenantAnonymousDocument)
        </HeadingComponent>
        {renderJson(getTenantAnonymousQuery.data?.getTenantAnonymous)}
      </div> */}
      <div>
        <HeadingComponent type="h2" size="2xl">
          listUsers.query.graphql (ListUsersDocument)
        </HeadingComponent>
        {renderJson(listUsersQuery.data?.listUsers)}
      </div>
      <div>
        <HeadingComponent type="h2" size="2xl">
          listUserRoles.query.graphql (ListUserRolesDocument)
        </HeadingComponent>
        {renderJson(listUserRolesQuery.data?.listUserRoles)}
      </div>
      <div>
        <HeadingComponent type="h2" size="2xl">
          getAppAnonymous.query.graphql (GetAppAnonymousDocument)
        </HeadingComponent>
        {renderJson(getAppAnonymousQuery.data?.getAppAnonymous)}
      </div>
      {/* <div>
        <HeadingComponent type="h2" size="2xl">
          getAppPlans.query.graphql (GetAppPlansDocument (light))
        </HeadingComponent>
        {renderJson(
          getPaymentOptionsAnonymousQuery.data?.getPaymentOptionsAnonymous
        )}
      </div> */}
    </div>
  );
}
