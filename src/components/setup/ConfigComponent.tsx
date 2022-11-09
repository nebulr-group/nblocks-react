import { useQuery } from "@apollo/client";
import React, { FunctionComponent, useState } from "react";
import { GetAppConfigDocument } from "../../gql/graphql";
import { HeadingComponent } from "../shared/HeadingComponent";
import { ModalComponent } from "../shared/ModalComponent";
import { NblocksButton } from "../shared/NblocksButton";
import { SubHeadingComponent } from "../shared/SubHeadingComponent";
import { KeyIcon } from "@heroicons/react/20/solid";

type ComponentProps = {};

const ConfigComponent: FunctionComponent<ComponentProps> = ({}) => {
  const { data, loading, error } = useQuery(GetAppConfigDocument);
  const [credentialsModalOpen, setCredentialsModalOpen] = useState(false);

  return (
    <div className="space-y-2">
      <HeadingComponent type="h1" size="4xl">
        App details
      </HeadingComponent>
      <SubHeadingComponent type={"primary"} size="xl">
        ID: {data?.getAppConfig.id}
      </SubHeadingComponent>
      <SubHeadingComponent type={"primary"} size="xl">
        Name: {data?.getAppConfig.name}
      </SubHeadingComponent>
      <div>
        <SubHeadingComponent type={"primary"} size="xl">
          User roles
        </SubHeadingComponent>
        <ul className="list-disc">
          {data?.getAppConfig.roles?.map((role) => (
            <li>
              {role} {role === data.getAppConfig.defaultRole ? "(Default)" : ""}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <SubHeadingComponent type={"primary"} size="xl">
          Plans
        </SubHeadingComponent>
        <ul className="list-disc">
          {data?.getAppConfig.businessModel?.plans.map((plan, i) => (
            <li key={i}>
              {plan.name} -{" "}
              {plan.prices.map((price, j) => (
                <i key={j}>
                  {price.currency} {price.amount} ({price.region}),{" "}
                </i>
              ))}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <NblocksButton
          type={"primary"}
          size={"lg"}
          onClick={() => {
            setCredentialsModalOpen(true);
          }}
        >
          Update credentials
        </NblocksButton>
        <ModalComponent
          isOpen={credentialsModalOpen}
          setIsOpen={setCredentialsModalOpen}
          heading={"Reset Password"}
          description={
            "Do you want to send a reset password link to Candice Wu?"
          }
          icon={<KeyIcon />}
        >
          <div className="flex flex-col-reverse md:flex-row md:justify-between mt-5 gap-3">
            <NblocksButton
              size="md"
              className="w-full"
              type="tertiary"
              onClick={() => setCredentialsModalOpen(false)}
            >
              Cancel
            </NblocksButton>
            <NblocksButton
              size="md"
              className="w-full"
              type="primary"
              onClick={() => {
                alert("Saved!");
                setCredentialsModalOpen(false);
              }}
            >
              Save changes
            </NblocksButton>
          </div>
        </ModalComponent>
      </div>
    </div>
  );
};

export { ConfigComponent };
