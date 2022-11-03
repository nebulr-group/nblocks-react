import { useMutation } from "@apollo/client";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
  InputComponent,
  ModalComponent,
  NblocksButton,
  TextComponent,
  UserListTableComponent,
} from "../..";
import { CreateUsersDocument, ListUsersDocument } from "../../gql/graphql";

const UserListScreen: FunctionComponent<{}> = () => {
  return (
    <div>
      <InviteUserBtn />
      <UserListTableComponent />
    </div>
  );
};

const InviteUserBtn: FunctionComponent<{}> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [usernames, setUsernames] = useState<string[]>([""]);
  const [inviteUserMutation, inviteUserMutationData] =
    useMutation(CreateUsersDocument);

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

  return (
    <>
      <div className="flex justify-end p-6">
        <NblocksButton
          type={"primary"}
          size={"lg"}
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
        heading={"Add user"}
        description={
          "Add one or multiple users. You can change their role in the table after they are added."
        }
      >
        <div className="space-y-3">
          {usernames.map((username, i) => (
            <InputComponent
              key={`email${i}`}
              type="email"
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
        <div className="flex flex-col-reverse md:flex-row md:justify-between mt-5 gap-3">
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
            }}
          >
            Add
          </NblocksButton>
        </div>
      </ModalComponent>
    </>
  );
};

export { UserListScreen };
