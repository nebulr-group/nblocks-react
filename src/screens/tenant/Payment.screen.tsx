import React, { FunctionComponent, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { loadStripe } from "@stripe/stripe-js";
import {
  CreateCheckoutSessionDocument,
  GetTenantDocument,
  Tenant,
} from "../../gql/graphql";
import { useNavigate } from "react-router-dom";
import { useConfig } from "../../hooks/config-context";

const PaymentScreen: FunctionComponent = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GetTenantDocument);
  const { handoverRoute, debug } = useConfig();

  const [createCheckoutMutation, checkoutMutationData] = useMutation(
    CreateCheckoutSessionDocument
  );

  useEffect(() => {
    const createCheckout = async () => {
      if (shouldShowStripeCheckout(data?.getTenant)) {
        const result = await createCheckoutMutation({
          variables: { args: { plan: data?.getTenant.plan! } },
        });

        if (result.data) {
          const stripe = await loadStripe(
            result.data.createCheckoutSession.publicKey
          );
          stripe?.redirectToCheckout({
            sessionId: result.data.createCheckoutSession.id,
          });
        }
      } else {
        log(
          `Tenant is not required to setup payments. Redirecting to ${handoverRoute}`
        );
        navigate(handoverRoute);
      }
    };

    createCheckout();
  }, [data]);

  const shouldShowStripeCheckout = (tenant?: Tenant) => {
    return tenant?.plan && tenant?.paymentsRequired;
  };

  const log = (msg: string) => {
    if (debug) {
      console.log(msg);
    }
  };

  return <></>;
};

export { PaymentScreen };
