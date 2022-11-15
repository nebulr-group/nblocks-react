import React, { FunctionComponent, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { loadStripe } from "@stripe/stripe-js";
import { ModalComponent } from "../../components/shared/ModalComponent";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import {
  CreateCheckoutSessionDocument,
  GetTenantDocument,
} from "../../gql/graphql";
import { NblocksButton } from "../../components/shared/NblocksButton";
import { Navigate } from "react-router-dom";
import { LinkComponent } from "../../components/shared/LinkComponent";
import { useConfig } from "../../hooks/config-context";

const PaymentScreen: FunctionComponent = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { data, loading, error } = useQuery(GetTenantDocument);

  const { handoverRoute } = useConfig();

  const [createCheckoutMutation, checkoutMutationData] = useMutation(
    CreateCheckoutSessionDocument
  );
  useEffect(() => {
    const createCheckout = async () => {
      if (data?.getTenant.paymentsRequired && data?.getTenant.plan) {
        const result = await createCheckoutMutation({
          variables: { args: { plan: data.getTenant.plan } },
        });

        if (result.data) {
          const stripe = await loadStripe(
            result.data.createCheckoutSession.publicKey
          );
          stripe?.redirectToCheckout({
            sessionId: result.data.createCheckoutSession.id,
          });
        }
      }
    };

    createCheckout();
  }, [data]);
  return (
    <ModalComponent
      isOpen={modalIsOpen}
      setIsOpen={setModalIsOpen}
      heading={
        "Oops, seems like you already met the requirements for payments."
      }
      iconType={"warning"}
      icon={<ExclamationTriangleIcon />}
    >
      <div className="flex flex-col-reverse md:flex-row md:justify-between mt-8 gap-3">
        {/* Make the button disabled when both inputs are undefined, and when one is undefined make it possible to send */}
        <LinkComponent to={handoverRoute} className="w-full" type="primary">
          Back to home
        </LinkComponent>
      </div>
    </ModalComponent>
  );
};

export { PaymentScreen };
