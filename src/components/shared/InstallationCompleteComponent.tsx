import React, { FunctionComponent } from "react";
import { useAuth } from "../../hooks/auth-context";
import { HeadingComponent } from "./HeadingComponent";
import { LinkComponent } from "./LinkComponent";
import { SubHeadingComponent } from "./SubHeadingComponent";

const InstallationCompleteComponent: FunctionComponent<{}> = ({}) => {
  const { currentUser } = useAuth();
  return (
    <>
      <div>
        <HeadingComponent type={"h1"} size="4xl">
          Hi {currentUser.user?.fullName}!
        </HeadingComponent>
        <SubHeadingComponent type={"primary"} size="2xl">
          You are now set up, supercharged and ready to power your app with all
          that we have to offer. Enjoy prebuilt frontend views and full
          functionality for:
        </SubHeadingComponent>
        <ul>
          <li>Tenancy</li>
          <li>Register & onboarding</li>
          <li>Login</li>
          <li>Access control</li>
          <li>User management</li>
          <li>Checkout and billing</li>
          <li>And more...</li>
        </ul>
        <LinkComponent to={"/user/list"} type={"primary"} className={"mt-5"}>
          Checkout your users!
        </LinkComponent>
      </div>
    </>
  );
};

export { InstallationCompleteComponent };
