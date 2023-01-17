import { useSecureContext } from "../../../hooks/secure-http-context";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useAuth } from "../../../hooks/auth-context";
import { AuthTenantUserResponseDto } from "../../../models/auth-tenant-user-response.dto";
import { NblocksButton } from "../../shared/NblocksButton";
import { AuthService } from "../../../utils/AuthService";
import { Option, RadioGroupComponent } from "../../shared/RadioGroupComponent";
import { ImageComponent } from "../../shared/ImageComponent";
import { TextComponent } from "../../shared/TextComponent";
import { LinkComponent } from "../../shared/LinkComponent";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { AlertComponent } from "../../shared/AlertComponent";
import { useConfig } from "../../../hooks/config-context";
import { SkeletonLoader } from "../../shared/SkeletonLoader";

type ComponentProps = {
  didSelectUser: (user: AuthTenantUserResponseDto) => void;
  didFinishedInitialLoading?: () => void;
};

const convertToOption = (user: AuthTenantUserResponseDto): Option => {
  return {
    label: user.tenant.name ? user.tenant.name : "New account",
    value: user.id,
    icon: (
      <div style={{ minWidth: 32, height: 32 }}>
        <ImageComponent src={user.tenant.logo} />
      </div>
    ),
  };
};

const ChooseUserComponent: FunctionComponent<ComponentProps> = ({
  didSelectUser,
  didFinishedInitialLoading: finishedInitialLoading,
}) => {
  const { switchUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { authService, didAuthenticate } = useSecureContext();
  const [users, setUsers] = useState<AuthTenantUserResponseDto[]>();
  const [selectedUser, setSelectedUser] = useState<AuthTenantUserResponseDto>();
  const { debug } = useConfig();

  const submit = async (user?: AuthTenantUserResponseDto) => {
    setIsLoading(true);
    if (user) {
      await switchUser(user.id);
      didAuthenticate(true);
      didSelectUser(user);
      setIsLoading(false);
    } else {
      console.error("No selected user. Submitting doesn't matter yet");
      setIsLoading(false);
    }
  };

  const onDidSelectOption = (option: Option) => {
    setSelectedUser(users!.find((user) => user.id === option.value));
  };

  const log = (msg: string) => {
    if (debug) {
      console.log(msg);
    }
  };

  useEffect(() => {
    if (!users) {
      authService.listUsers().then((users) => {
        setUsers(users);
        if (finishedInitialLoading) {
          finishedInitialLoading();
        }
      });
    }
  }, []);

  useEffect(() => {
    if (users) {
      // Support pre selecting user based on localstorage data
      const id = AuthService.getTenantUserId();
      if (id) {
        const userMatch = users.find((user) => user.id === id);
        if (userMatch) {
          log("Pre selecting current workspace");
          setSelectedUser(userMatch);
        }
      }

      // Auto select user if only one workspace is available
      if (users.length === 1) {
        log("User has just one workspace access. Assuming this.");
        submit(users[0]);
      }
    }
  }, [users]);

  return (
    <>
      {users && users.length === 0 && (
        <AlertComponent
          type="warning"
          title="No workspace found!"
          messages={["You don't belong to any workspace. Contact support!"]}
        />
      )}
      <div className="max-w-sm w-full mb-6">
        {users && users?.length > 0 ? (
          <RadioGroupComponent
            didSelectOption={(value) => onDidSelectOption(value)}
            defaultValue={
              selectedUser ? convertToOption(selectedUser) : undefined
            }
            options={users.map((u) => convertToOption(u))}
          />
        ) : (
          <>
            <SkeletonLoader className="w-full mt-3 h-14 rounded-md" />
            <SkeletonLoader className="w-full mt-3 h-14 rounded-md" />
            <SkeletonLoader className="w-full mt-3 h-14 rounded-md" />
          </>
        )}
      </div>
      <div className="max-w-sm w-full">
        <NblocksButton
          submit={true}
          disabled={!selectedUser}
          size="md"
          isLoading={isLoading}
          type="primary"
          onClick={() => submit(selectedUser)}
          fullWidth={true}
        >
          Login
        </NblocksButton>
      </div>
      <div className="text-center mt-8">
        <TextComponent size="sm">Not seeing your workspace?</TextComponent>
        <LinkComponent
          to={RouteConfig.login.loginScreen}
          type="primary"
          size="sm"
          className="font-semibold"
        >
          Try a different email
        </LinkComponent>
      </div>
    </>
  );
};

export { ChooseUserComponent };
