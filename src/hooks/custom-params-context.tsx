import { useQuery } from "@apollo/client";
import React, { FunctionComponent, useContext } from "react";
import { GetTenantUserCustomParamsConfigAnonymousDocument, CustomParamsConfigGraphql } from "../gql/graphql";

interface CustomParamsContextType {
  customParams?: CustomParamsConfigGraphql;
}

const initialContext: CustomParamsContextType = {
  customParams: undefined
};

const CustomParamsContext = React.createContext<CustomParamsContextType>(initialContext);
const useCustomParams = () => useContext(CustomParamsContext);

const CustomParamsContextProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { data, loading, error } = useQuery(GetTenantUserCustomParamsConfigAnonymousDocument);

  const contextValue: CustomParamsContextType = {
    customParams: data?.getTenantUserCustomParamsConfigAnonymous
  };

  return (
    <CustomParamsContext.Provider value={contextValue}>
      {children}
    </CustomParamsContext.Provider>
  );
};

export { CustomParamsContextProvider, useCustomParams };
