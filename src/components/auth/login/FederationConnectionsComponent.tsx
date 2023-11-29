import React, { FunctionComponent, useEffect, useState } from "react";
import { FederationConnection } from "../../../utils/OAuthService";
import { NblocksButton } from "../../shared/NblocksButton";
import { useTranslation } from "react-i18next";

interface FederationConnectionsComponentProps {
  connections: FederationConnection[];
  didClickConnection: (connection: FederationConnection) => void;
}

const FederationConnectionsComponent: FunctionComponent<
  FederationConnectionsComponentProps
> = ({ connections, didClickConnection }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<string>("");

  const clickMiddleWare = (connection: FederationConnection) => {
    setLoading(connection.id);
    didClickConnection(connection);
  };

  useEffect(() => {
    if (connections && connections.length === 1) {
      // Auto submit if only one connection available
      clickMiddleWare(connections[0]);
    }
  }, []);

  return (
    <>
      {connections.map((connection, i) => (
        <NblocksButton
          size="sm"
          type="tertiary"
          fullWidth={true}
          onClick={() => clickMiddleWare(connection)}
          isLoading={loading === connection.id}
          key={`conn-${i}`}
        >
          {t("Sign in with") + " " + connection.name}
        </NblocksButton>
      ))}
    </>
  );
};

export { FederationConnectionsComponent };
