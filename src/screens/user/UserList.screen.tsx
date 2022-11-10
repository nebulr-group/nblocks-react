import { useMutation } from "@apollo/client";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
  HeadingComponent,
  InputComponent,
  ModalComponent,
  NblocksButton,
  TextComponent,
  UserListTableComponent,
} from "../..";
import { CreateUsersDocument, ListUsersDocument } from "../../gql/graphql";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import {
  ComponentProps,
  AlertComponent,
} from "../../components/shared/AlertComponent";

const UserListScreen: FunctionComponent<{}> = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="flex justify-between items-center py-5 mx-6">
          <HeadingComponent type={"h1"} size={"3xl"} className={"inline-block"}>
            Users
          </HeadingComponent>
          <InviteUserBtn />
        </div>
        <div className="grow flex flex-col justify-between">
          <UserListTableComponent />
        </div>
      </div>
    </>
  );
};

const InviteUserBtn: FunctionComponent<{}> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [usernames, setUsernames] = useState<string[]>([""]);
  const [inviteUserMutation, inviteUserMutationData] =
    useMutation(CreateUsersDocument);
  const [alert, setAlert] = useState<ComponentProps & { show: boolean }>({
    title: "",
    type: "primary",
    messages: [""],
    onCloseClick: (event) => {
      setAlert((value) => {
        return { ...value, show: false };
      });
    },
    show: false,
  });

  const inviteUsers = async () => {
    await inviteUserMutation({
      variables: {
        userNames: usernames.filter((username) => username.length > 0),
      },
      refetchQueries: [{ query: ListUsersDocument }],
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setUsernames([""]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (alert.show) {
      setTimeout(() => {
        setAlert((value) => {
          return { ...value, show: false };
        });
      }, 5000);
    }
  }, [alert.show]);
  return (
    <>
      <div>
        <NblocksButton
          type={"primary"}
          size={"md"}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add user
        </NblocksButton>
      </div>
      <ModalComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        icon={<UserPlusIcon />}
        heading={"Add user"}
        description={
          "Add one or multiple users. You can change their role in the table after they are added."
        }
      >
        <div className="space-y-3 mt-5">
          {usernames.map((username, i) => (
            <InputComponent
              key={`email${i}`}
              type="email"
              label={i === 0 ? "Email address" : undefined}
              placeholder="you@domain.com"
              name={`email${i}`}
              value={username}
              labelClassName={"mt-4"}
              onChange={(event) => {
                const values = [...usernames];
                values[i] = event.target.value;
                setUsernames(values);
              }}
            />
          ))}
          <NblocksButton
            onClick={() => {
              setUsernames([...usernames, ...[""]]);
            }}
          >
            <TextComponent
              size="sm"
              className="font-semibold"
              colorName="text-purple-700"
            >
              + Add another
            </TextComponent>
          </NblocksButton>
        </div>
        <div className="flex flex-col-reverse md:flex-row md:justify-between mt-8 gap-3">
          <NblocksButton
            size="md"
            className="w-full"
            type="tertiary"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </NblocksButton>
          <NblocksButton
            size="md"
            className="w-full"
            type="primary"
            onClick={() => {
              inviteUsers();
              setIsOpen(false);
              setAlert((value) => {
                return {
                  ...value,
                  title: "Invite has been sent!",
                  show: true,
                  type: "success",
                  messages: [
                    `Workspace invatation has been sent to users: ${usernames
                      .filter(Boolean)
                      .join(" ")}`,
                  ],
                };
              });
            }}
          >
            Add
          </NblocksButton>
        </div>
      </ModalComponent>
      {/* Alert component logic should be moved to context provider or root component which will expose the state setter and context */}
      {alert.show && (
        <AlertComponent
          title={alert.title}
          type={alert.type}
          className="fixed bottom-4 right-4 z-50 max-w-md w-full"
          messages={alert.messages}
          closable={true}
          onCloseClick={alert.onCloseClick}
        ></AlertComponent>
      )}
    </>
  );
};

export { UserListScreen };
