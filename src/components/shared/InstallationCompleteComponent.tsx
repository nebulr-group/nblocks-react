import React, { FunctionComponent } from "react";
import { useAuth } from "../../hooks/auth-context";
import { HeadingComponent } from "./HeadingComponent";
import { LinkComponent } from "./LinkComponent";
import { SubHeadingComponent } from "./SubHeadingComponent";

const InstallationCompleteComponent: FunctionComponent<{}> = ({}) => {
  const { currentUser } = useAuth();
  return (
    <>
      <div className="container py-12">
        <div className="flex flex-col text-center">
          <div>
            <HeadingComponent type={"h1"} size="5xl">
              &#128075; Hi {currentUser.user?.fullName}!
            </HeadingComponent>
          </div>
          <div className="max-w-3xl mx-auto">
            <SubHeadingComponent type={"primary"} className={"mt-3"} size="xl">
              You're now set up, supercharged and ready to power your app with
              all that we offer. Enjoy our prebuilt frontend views and full
              functionality for:
            </SubHeadingComponent>
          </div>
        </div>

        <ul className={"mt-8 space-y-2 max-w-sm mx-auto"}>
          <li className="p-4 border rounded-xl">
            <span className="mr-2">&#127968;</span> Tenancy
          </li>
          <li className="p-4 border rounded-xl">
            <span className="mr-2">&#9989;</span>Register & onboarding
          </li>
          <li className="p-4 border rounded-xl">
            <span className="mr-2">&#128272;</span>Login
          </li>
          <li className="p-4 border rounded-xl">
            <span className="mr-2">&#9940;</span>Access control
          </li>
          <li className="p-4 border rounded-xl">
            <span className="mr-2">&#128101;</span>User management
          </li>
          <li className="p-4 border rounded-xl">
            <span className="mr-2">&#128176;</span>Checkout and billing
          </li>
        </ul>
        <div className="mt-8 text-center flex flex-col gap-4 font-semibold">
          <LinkComponent to={"/user/list"} type={"primary"}>
            Manage your users
          </LinkComponent>
          <LinkComponent to={"/setup/config"} type={"primary"}>
            Configure your app
          </LinkComponent>
          <LinkComponent
            to={"https://nebulr-group.github.io/nblocks-docs/docs/quickstart"}
            type={"primary"}
            target={"_blank"}
            nativeBehavior={true}
          >
            Read the documentation
          </LinkComponent>
        </div>
      </div>
    </>
  );
};

export { InstallationCompleteComponent };
