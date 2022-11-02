import React, { useState, useEffect, FunctionComponent } from "react";
import { Cell, flexRender, Row } from "@tanstack/react-table";
import { UpdateUserDocument, User } from "../../gql/graphql";
import { useMutation } from "@apollo/client";
import { TogglerComponent } from "./TogglerComponent";
import { NblocksButton } from "./NblocksButton";
import { ListBoxComponent } from "./ListBoxComponent";
import { HorizontalEllipsisMenu, Option } from "./HorizontalEllipsisMenu";
import { ChipComponent } from "./ChipComponent";
import { ModalState } from "./UserListTableComponent";
import { KeyIcon, TrashIcon } from "@heroicons/react/24/outline";

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
  // Set your role options
  const roles = ["OWNER", "MANAGER", "ADMIN"];

  const [
    updateUserMutation,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UpdateUserDocument);
  const updateUser = async () => {
    await updateUserMutation({
      variables: {
        user: { id: row.original.id, role: role, enabled: enabled },
      },
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
  }, []);

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
                items={roles}
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
            label: "Reset password",
            onClick: () => {
              setModalState({
                heading: "Reset password",
                icon: <KeyIcon />,
                type: "primary",
                description: `Do you want to send a reset password link to ${cell.row.original.fullName}?`,
                onPrimaryClick: () => {},
              });
              setModalIsOpen(true);
            },
          },
          {
            label: "Delete",
            type: "danger",
            onClick: () => {
              setModalState({
                heading: "Delete user",
                icon: <TrashIcon />,
                type: "danger",
                description: `Are you sure you want to delete the user ${cell.row.original.fullName}?`,
                onPrimaryClick: () => {
                  // On Deletion
                },
              });
              setModalIsOpen(true);
            },
          },
        ];

        return (
          <div className="flex items-center">
            {edit && (
              <NblocksButton
                onClick={() => setEdit(false)}
                className="mr-3"
                type={"tertiary"}
                size={"sm"}
              >
                Cancel
              </NblocksButton>
            )}
            <NblocksButton
              onClick={() => (edit ? updateUser() : setEdit(true))}
              className={`${!edit && "text-purple-700 mr-3"}`}
              type={edit ? "primary" : undefined}
              size={edit ? "sm" : undefined}
            >
              {edit ? "Save" : "Edit"}
            </NblocksButton>
            {!edit && (
              <HorizontalEllipsisMenu options={options} position={"left"} />
            )}
          </div>
        );
      default:
        return flexRender(cell.column.columnDef.cell, cell.getContext());
    }
  };

  return (
    <tr key={row.id} className={"border-t border-b text-gray-600"}>
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
