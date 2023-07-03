import React, { useState, useEffect, FunctionComponent } from "react";
import { Cell, flexRender, Row } from "@tanstack/react-table";
import {
  DeleteUserDocument,
  ListUserRolesDocument,
  ListUsersDocument,
  SendPasswordResetLinkDocument,
  UpdateUserDocument,
  User,
} from "../../gql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { TogglerComponent } from "./TogglerComponent";
import { NblocksButton } from "./NblocksButton";
import { ListBoxComponent } from "./ListBoxComponent";
import { HorizontalEllipsisMenu, Option } from "./HorizontalEllipsisMenu";
import { ChipComponent } from "./ChipComponent";
import { ModalState } from "./UserListTableComponent";
import { KeyIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../hooks/auth-context";
import { useTranslation } from "react-i18next";

type ConfigObject = {
  row: Row<User>;
  setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserTableRowComponent: FunctionComponent<ConfigObject> = ({
  row,
  setModalState,
  setModalIsOpen,
}) => {
  // Row editing state
  const [edit, setEdit] = useState(false);
  // Row editing cells value states
  const [enabled, setEnabled] = useState(true);
  const [role, setRole] = useState("");
  const { t } = useTranslation();
  const { currentUser } = useAuth();

  const listRolesQuery = useQuery(ListUserRolesDocument);
  const [updateUserMutation, updateUserMutationData] =
    useMutation(UpdateUserDocument);
  const [resetPasswordMutation, resetPasswordUserMutationData] = useMutation(
    SendPasswordResetLinkDocument
  );
  const [deleteUserMutation, deleteUserMutationData] =
    useMutation(DeleteUserDocument);

  const loading =
    listRolesQuery.loading ||
    updateUserMutationData.loading ||
    resetPasswordUserMutationData.loading;

  const updateUser = async () => {
    await updateUserMutation({
      variables: {
        user: { id: row.original.id, role: role, enabled: enabled },
      },
    });
    setEdit(false);
  };

  const deleteUser = async () => {
    await deleteUserMutation({
      variables: { userId: row.original.id },
      refetchQueries: [{ query: ListUsersDocument }],
    });
    setEdit(false);
  };

  const sendResetLink = async () => {
    await resetPasswordMutation({
      variables: { userId: row.original.id },
    });
    setEdit(false);
  };

  // Set state values on first render
  useEffect(() => {
    const cells = row.getVisibleCells();
    cells.map((cell) => {
      cell.column.id === "role" && setRole(cell.getValue() as string);
      cell.column.id === "enabled" && setEnabled(cell.getValue() as boolean);
      return null;
    });
  }, [edit]);

  const getCellContext = (cellId: string, cell: Cell<User, unknown>) => {
    switch (cellId) {
      case "enabled":
        return edit ? (
          <TogglerComponent enabled={enabled} setEnabled={setEnabled} />
        ) : (
          <ChipComponent
            type={cell.getValue() ? "success" : "tertiary"}
            icon={
              <span
                className={`rounded-full mr-1 w-1.5 h-1.5${
                  cell.getValue() ? " bg-green-500" : " bg-gray-500"
                }`}
              ></span>
            }
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </ChipComponent>
        );
      case "role":
        return (
          <>
            {edit ? (
              <ListBoxComponent
                items={
                  listRolesQuery.data?.listUserRoles
                    ? listRolesQuery.data?.listUserRoles
                    : []
                }
                selected={role}
                setSelected={setRole}
              />
            ) : (
              flexRender(cell.column.columnDef.cell, cell.getContext())
            )}
          </>
        );
      case "edit":
        const options: Option[] = [
          {
            label: t("Reset password"),
            onClick: () => {
              setModalState({
                heading: t("Reset password"),
                icon: <KeyIcon />,
                type: "primary",
                description: `Do you want to send a reset password link to ${cell.row.original.fullName}?`,
                onPrimaryClick: () => {
                  sendResetLink();
                  setModalIsOpen(false);
                },
              });
              setModalIsOpen(true);
            },
          },
          {
            label: t("Delete"),
            type: "danger",
            onClick: () => {
              setModalState({
                heading: t("Delete user"),
                icon: <TrashIcon />,
                type: "danger",
                description: `Are you sure you want to delete the user ${cell.row.original.fullName}?`,
                onPrimaryClick: () => {
                  deleteUser();
                  setModalIsOpen(false);
                },
              });
              setModalIsOpen(true);
            },
          },
        ];

        if (currentUser.authenticated && currentUser.isSameUser(row.original)) {
          return <></>;
        } else {
          return (
            <div className="flex items-center">
              {edit && (
                <NblocksButton
                  onClickCapture={() => setEdit(false)}
                  className="mr-3"
                  type={"tertiary"}
                  size={"sm"}
                >
                  {t("Cancel")}
                </NblocksButton>
              )}
              <NblocksButton
                onClickCapture={() => (edit ? updateUser() : setEdit(true))}
                className={`${!edit && "text-purple-700 mr-3"}`}
                type={edit ? "primary" : undefined}
                size={edit ? "sm" : undefined}
              >
                {edit ? t("Save") : t("Edit")}
              </NblocksButton>
              {!edit && (
                <HorizontalEllipsisMenu options={options} position={"left"} />
              )}
            </div>
          );
        }
      default:
        return flexRender(cell.column.columnDef.cell, cell.getContext());
    }
  };

  return (
    <tr
      key={row.id}
      className={"border-t border-b text-gray-600"}
      onClick={
        row.original.id === currentUser.user?.id
          ? undefined
          : (event) => {
              setEdit(true);
            }
      }
      tabIndex={row.index}
    >
      {row.getVisibleCells().map((cell) => {
        return (
          <td className={"relative"} key={cell.id}>
            {getCellContext(cell.column.id, cell)}
          </td>
        );
      })}
    </tr>
  );
};

export { UserTableRowComponent };
