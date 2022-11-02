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

type ComponentProps = {
  didSelectUser: (user: AuthTenantUserResponseDto) => void;
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
}) => {
  const { switchUser } = useAuth();
  const { authService, didAuthenticate } = useSecureContext();
  const [users, setUsers] = useState<AuthTenantUserResponseDto[]>();
  const [selectedUser, setSelectedUser] = useState<AuthTenantUserResponseDto>();
  const { debug } = useConfig();

  const submit = async (user?: AuthTenantUserResponseDto) => {
    if (user) {
      await switchUser(user.id);
      didAuthenticate(true);
      didSelectUser(user);
    } else {
      console.error("No selected user. Submitting doesn't matter yet");
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
      });
    }
  }, []);

  useEffect(() => {
    if (users) {
      // Support pre selecting user based on localstorage data
      AuthService.getTenantUserId().then((id) => {
        if (id) {
          const userMatch = users.find((user) => user.id === id);
          if (userMatch) {
            log("Pre selecting current workspace");
            setSelectedUser(userMatch);
          }
        }
      });

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
      <div>
        {users && users?.length > 0 && (
          <RadioGroupComponent
            didSelectOption={(value) => onDidSelectOption(value)}
            defaultValue={
              selectedUser ? convertToOption(selectedUser) : undefined
            }
            options={users.map((u) => convertToOption(u))}
          />
        )}
      </div>
      <div>
        <NblocksButton
          submit={true}
          disabled={!selectedUser}
          size="md"
          type="primary"
          onClick={() => submit(selectedUser)}
          fullWidth={true}
        >
          Login
        </NblocksButton>
      </div>
      <div>
        <TextComponent size="sm">Not seeing your workspace?</TextComponent>
        <LinkComponent
          to={RouteConfig.login.LoginScreen}
          type="primary"
          size="sm"
        >
          Try a different email
        </LinkComponent>
      </div>
    </>
  );
};

export { ChooseUserComponent };
