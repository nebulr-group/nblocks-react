import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { AlertComponent } from "../components/shared/AlertComponent";
import { FormComponent } from "../components/shared/FormComponent";
import { HeadingComponent } from "../components/shared/HeadingComponent";
import { HorizontalEllipsisMenu } from "../components/shared/HorizontalEllipsisMenu";
import { ImageComponent } from "../components/shared/ImageComponent";
import { InputComponent } from "../components/shared/InputComponent";
import { LinkComponent } from "../components/shared/LinkComponent";
import { ModalComponent } from "../components/shared/ModalComponent";
import { NblocksButton } from "../components/shared/NblocksButton";
import { SubHeadingComponent } from "../components/shared/SubHeadingComponent";
import { TextComponent } from "../components/shared/TextComponent";
import { TogglerComponent } from "../components/shared/TogglerComponent";
import { UserListTableComponent } from "../components/shared/UserListTableComponent";
import { CheckCircleIcon, KeyIcon } from "@heroicons/react/20/solid";
import { NBPlanAccessControlComponent } from "../components/shared/access-control/PlanAccessControllComponent";
import { NBRoleAccessControlComponent } from "../components/shared/access-control/RoleAccessControllComponent";
import { NBAccessControlComponent } from "../components/shared/access-control/AccessControllComponent";
import { useAuth } from "../hooks/auth-context";
import { TabsComponent } from "../components/shared/TabsComponent";
import { TableComponent } from "../components/shared/TableComponent";
import { ColumnDef } from "@tanstack/react-table";
import { CheckboxComponent } from "../components/shared/CheckboxComponent";
import { GoogleSsoButtonComponent } from "../components/auth/shared/GoogleSsoButtonComponent";
import { AzureAdSsoButtonComponent } from "../components/auth/shared/AzureAdSsoButtonComponent";
import { PasskeysLoginButtonComponent } from "../components/auth/shared/PasskeysLoginButtonComponent";

export function BrandExpoScreen() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [enabled, setEnabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { currentUser } = useAuth();

  const image =
    "https://cdn.shopify.com/s/files/1/0980/9736/articles/jessica-felicio-_cvwXhGqG-o-unsplash.jpg?v=1595591981";

  type Item = {
    name: string;
    price: number;
    quantity: number;
  };

  const tableMockCols: ColumnDef<Item>[] = [
    {
      header: "Name",
      cell: (row) => row.renderValue(),
      accessorKey: "name",
    },
    {
      header: "Price",
      cell: (row) => row.renderValue(),
      accessorKey: "price",
    },
    {
      header: "Quantity",
      cell: (row) => row.renderValue(),
      accessorKey: "quantity",
    },
  ];

  const tableMockData = () => {
    const items = [];
    for (let i = 0; i < 5; i++) {
      items.push({
        id: i,
        name: `Item ${i}`,
        price: 100,
        quantity: 1,
      });
    }
    return items;
  };

  return (
    <>
      <div className="columns-1 py-8">
        <h1 className="mt-5 text-3xl">Brand Expo</h1>
        <div>
          <NblocksButton
            type="primary"
            size="xl"
            disabled={false}
            onClick={() => console.log("Hello World!")}
            className={"mt-4"}
          >
            Button
          </NblocksButton>
        </div>
        <div className="grid">
          <h2 className="mt-5 text-3xl">Form Inputs</h2>
          <InputComponent
            type="text"
            label="Email1"
            placeholder="olivia@untitledui.com"
            name="email1"
            infoLabel={{
              position: "left",
              node: <CheckCircleIcon className="text-purple-600 h-5 w-5" />,
              alt: "Tool tip icon.",
            }}
            labelClassName={"mt-4"}
            onChange={(event) => {
              console.log(event.target.value);
            }}
          />
          <InputComponent
            type="password"
            label="Password"
            placeholder="Password"
            name="password1"
            errorLabel={{
              position: "right",
              node: <CheckCircleIcon className="text-purple-600 h-5 w-5" />,
              alt: "Tool tip icon.",
            }}
            inputError={true}
            labelClassName={"mt-4"}
            caption={<p className="mt-2 text-sm text-gray-500">Hello World</p>}
          />
          <InputComponent
            type="number"
            label="Number"
            placeholder="Number"
            name="number"
            min={1}
            max={100000}
            labelClassName={"mt-4"}
            infoLabel={{
              position: "right",
              node: <CheckCircleIcon className="text-purple-600 h-5 w-5" />,
              alt: "Tool tip icon.",
            }}
          />
          <InputComponent
            type="tel"
            label="Telephone Number"
            placeholder="Telephone Number"
            name="tel"
            minLength={1}
            maxLength={10}
            labelClassName={"mt-4"}
            infoLabel={{
              position: "right",
              node: <CheckCircleIcon className="text-purple-600 h-5 w-5" />,
              alt: "Tool tip icon.",
            }}
          />
          <InputComponent
            type="text"
            label="Text"
            placeholder="Text"
            name="text"
            labelClassName={"mt-4"}
            infoLabel={{
              position: "right",
              node: <CheckCircleIcon className="text-purple-600 h-5 w-5" />,
              alt: "Tool tip icon.",
            }}
          />
        </div>
        <div className="grid">
          <h1 className="mt-5 text-3xl">Links</h1>
          <LinkComponent
            to={"/"}
            type={"primary"}
            size={"sm"}
            className={"mt-5"}
          >
            Back to home
          </LinkComponent>
          <LinkComponent
            to={"https://www.google.com"}
            type={"primary"}
            size={"sm"}
            nativeBehavior={true}
            target={"_blank"}
            className={"mt-5"}
          >
            Go to Google (new tab)
          </LinkComponent>
          <LinkComponent
            to={"/"}
            type={"primary"}
            size={"md"}
            className={"mt-5"}
            disabled={true}
          >
            Back to home (disabled)
          </LinkComponent>
          <LinkComponent
            to={"/"}
            type={"secondary"}
            className={"mt-5"}
            size={"lg"}
          >
            Back to home (secondary)
          </LinkComponent>
        </div>
        <div className="grid">
          <h1 className="mt-5 text-3xl">Headings</h1>
          <HeadingComponent type={"h1"} size={"8xl"} className={"mt-5"}>
            Hello World
          </HeadingComponent>
          <HeadingComponent type={"h2"} size={"7xl"} className={"mt-5"}>
            Hello World
          </HeadingComponent>
          <HeadingComponent type={"h3"} size={"6xl"} className={"mt-5"}>
            Hello World
          </HeadingComponent>
          <HeadingComponent type={"h4"} size={"5xl"} className={"mt-5"}>
            Hello World
          </HeadingComponent>
          <HeadingComponent type={"h5"} size={"4xl"} className={"mt-5"}>
            Hello World
          </HeadingComponent>
          <HeadingComponent type={"h6"} size={"3xl"} className={"mt-5"}>
            Hello World
          </HeadingComponent>
        </div>
        <div className="grid">
          <h1 className="mt-5 text-3xl">Subheadings</h1>
          <SubHeadingComponent type={"primary"} size={"6xl"}>
            Hello World
          </SubHeadingComponent>
          <SubHeadingComponent type={"primary"} size={"5xl"}>
            Hello World
          </SubHeadingComponent>
          <SubHeadingComponent type={"primary"} size={"4xl"}>
            Hello World
          </SubHeadingComponent>
          <SubHeadingComponent type={"primary"} size={"3xl"}>
            Hello World
          </SubHeadingComponent>
          <SubHeadingComponent type={"primary"} size={"2xl"}>
            Hello World
          </SubHeadingComponent>
          <SubHeadingComponent type={"primary"} size={"xl"}>
            Hello World
          </SubHeadingComponent>
          <SubHeadingComponent type={"primary"} size={"lg"}>
            Hello World
          </SubHeadingComponent>
          <SubHeadingComponent type={"primary"} size={"base"}>
            Hello World
          </SubHeadingComponent>
          <SubHeadingComponent type={"primary"} size={"sm"}>
            Hello World
          </SubHeadingComponent>
        </div>
        <div className="grid">
          <h1 className="mt-5 text-3xl">Image Component</h1>
          <div className="flex flex-column items-baseline mt-5">
            <div style={{ width: 32, height: 32 }}>
              <ImageComponent src={image}></ImageComponent>
            </div>
            <div style={{ width: 64, height: 64 }} className="ml-5">
              <ImageComponent src={image}></ImageComponent>
            </div>
            <div style={{ width: 124, height: 124 }} className="ml-5">
              <ImageComponent src={image}></ImageComponent>
            </div>
          </div>
          <div className="flex flex-column items-baseline mt-5">
            <div style={{ width: 32, height: 32 }}>
              <ImageComponent src={image} type={"rounded"}></ImageComponent>
            </div>
            <div style={{ width: 64, height: 64 }} className="ml-5">
              <ImageComponent src={image} type={"rounded"}></ImageComponent>
            </div>
            <div style={{ width: 124, height: 124 }} className="ml-5">
              <ImageComponent src={image} type={"rounded"}></ImageComponent>
            </div>
          </div>
          <div className="flex flex-column items-baseline mt-5">
            <div style={{ width: 32, height: 32 }}>
              <ImageComponent src={image} type={"circle"}></ImageComponent>
            </div>
            <div style={{ width: 64, height: 64 }} className="ml-5">
              <ImageComponent src={image} type={"circle"}></ImageComponent>
            </div>
            <div style={{ width: 124, height: 124 }} className="ml-5">
              <ImageComponent src={image} type={"circle"}></ImageComponent>
            </div>
          </div>
        </div>
        <div>
          <h1 className="mt-5 text-3xl">Form Component</h1>
        </div>
        <div className="grid grid-cols-9 py-8">
          <FormComponent
            className={"col-start-3 col-end-8 block"}
            onSubmit={(event) => {
              event.preventDefault();

              console.log(email);
              console.log(password);
            }}
          >
            <InputComponent
              type="email"
              label="Enter Your Email Address"
              placeholder="olivia@untitledui.com"
              name="email"
              labelClassName={"mt-4 block"}
              caption={
                <p className="mt-2 text-sm text-gray-500">
                  Please, enter your email.
                </p>
              }
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
            <InputComponent
              type="password"
              label="Password"
              placeholder="Password"
              name="password"
              labelClassName={"mt-5 block"}
              caption={
                <p className="mt-2 text-sm text-gray-500">
                  Please, enter your login password.
                </p>
              }
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
            <CheckboxComponent
              label="Accept"
              sublabel=" terms and conditions"
              name="checkbox"
            />
            <NblocksButton
              submit={true}
              type={"tertiary"}
              size={"xl"}
              className={"w-full mt-5"}
            >
              Submit
            </NblocksButton>
          </FormComponent>
        </div>
        <div className="grid space-y-2 w-1/4">
          <h1 className="mt-5 text-3xl">Social Login</h1>
          <PasskeysLoginButtonComponent mode="login" onClick={() => {}} />
          <GoogleSsoButtonComponent label="login" onClick={() => {}} />
          <AzureAdSsoButtonComponent label="login" onClick={() => {}} />
        </div>
        <div className="grid">
          <h1 className="mt-5 text-3xl">Text Component</h1>
          <TextComponent size={"base"}>This is text component.</TextComponent>
          <TextComponent size={"sm"}>This is text component.</TextComponent>
        </div>
        <h1 className="mt-5 text-3xl">Alerts</h1>
        <div className="space-y-2">
          <AlertComponent
            title="Primary heading"
            messages={["There's something that needs your attention"]}
            type="primary"
          />
          <AlertComponent
            title="Secondary heading"
            messages={[
              "There's something that needs your attention",
              "There's another thing that needs your attention",
            ]}
            type="secondary"
          />
          <AlertComponent
            title="Danger heading"
            messages={["Something went terrible wrong"]}
            type="danger"
          />
          <AlertComponent
            title="Warning heading"
            messages={["Your missing some important info"]}
            type="warning"
          />
          <AlertComponent
            title="Success heading"
            messages={["Something went good!"]}
            type="success"
          />
        </div>
        <div className="grid">
          <h1 className="mt-5 text-3xl">Toggler Component</h1>
          <TogglerComponent
            enabled={enabled}
            setEnabled={setEnabled}
          ></TogglerComponent>
        </div>
        <div className="grid">
          <h1 className="mt-5 text-3xl">Tabs Component</h1>
          <TabsComponent
            categories={["Tab1", "Tab2", "Tab3"]}
            onChange={console.log}
          ></TabsComponent>
        </div>
        <div className="grid">
          <h1 className="mt-5 text-3xl">Modal Component</h1>
          <div>
            <NblocksButton
              type={"primary"}
              size={"lg"}
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Open Modal
            </NblocksButton>
            <ModalComponent
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              heading={"Reset Password"}
              width="5xl"
              description={
                "Do you want to send a reset password link to Candice Wu?"
              }
              icon={<KeyIcon />}
            >
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
                    alert("Saved!");
                    setIsOpen(false);
                  }}
                >
                  Save changes
                </NblocksButton>
              </div>
            </ModalComponent>
          </div>
        </div>
        <div>
          <h1 className="mt-5 text-3xl">Menu Drop Down</h1>
          <HorizontalEllipsisMenu
            options={[
              {
                label: "button1",
                icon: <KeyIcon />,
                type: "danger",
                onClick: () => alert("Option 1 was clicked!"),
              },
              {
                label: "button2",
                icon: <XMarkIcon />,
                onClick: () => alert("Option 2 was clicked!"),
              },
              {
                label: "button3",
                labelPosition: "center",
                onClick: () => alert("Option 3 was clicked!"),
              },
            ]}
            position="right"
          />
        </div>
        {currentUser?.authenticated && (
          <div className="w-full">
            <h1 className="mt-5 text-3xl">User List Component</h1>
            <UserListTableComponent />
          </div>
        )}
        <h1 className="mt-5 text-3xl">Table</h1>
        <div className="w-full">
          <TableComponent columns={tableMockCols} data={tableMockData()} />
        </div>
      </div>
      <h1 className="mt-5 text-3xl">Role Access control</h1>
      <table>
        <thead>
          <tr>
            <th>OWNER</th>
            <th>ADMIN</th>
            <th>MANAGER</th>
            <th>VIEWER</th>
            <th>OWNER or ADMIN</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <NBRoleAccessControlComponent
                roles={["OWNER"]}
                hiddenChildren={<h1>Hidden</h1>}
              >
                <h1 className="font-semibold">Visible</h1>
              </NBRoleAccessControlComponent>
            </td>
            <td>
              <NBRoleAccessControlComponent
                roles={["ADMIN"]}
                hiddenChildren={<h1>Hidden</h1>}
              >
                <h1 className="font-semibold">Visible</h1>
              </NBRoleAccessControlComponent>
            </td>
            <td>
              <NBRoleAccessControlComponent
                roles={["MANAGER"]}
                hiddenChildren={<h1>Hidden</h1>}
              >
                <h1 className="font-semibold">Visible</h1>
              </NBRoleAccessControlComponent>
            </td>
            <td>
              <NBRoleAccessControlComponent
                roles={["VIEWER"]}
                hiddenChildren={<h1>Hidden</h1>}
              >
                <h1 className="font-semibold">Visible</h1>
              </NBRoleAccessControlComponent>
            </td>
            <td>
              <NBRoleAccessControlComponent
                roles={["OWNER", "ADMIN"]}
                hiddenChildren={<h1>Hidden</h1>}
              >
                <h1 className="font-semibold">Visible</h1>
              </NBRoleAccessControlComponent>
            </td>
          </tr>
        </tbody>
      </table>
      <h1 className="mt-5 text-3xl">Plan Access control</h1>
      <table>
        <thead>
          <tr>
            <th>FREEMIUM</th>
            <th>ESSENTIAL</th>
            <th>TEAM</th>
            <th>BASIC</th>
            <th>TEAM or BASIC</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <NBPlanAccessControlComponent
                plans={["FREEMIUM"]}
                hiddenChildren={<h1>Hidden</h1>}
              >
                <h1 className="font-semibold">Visible</h1>
              </NBPlanAccessControlComponent>
            </td>
            <td>
              <NBPlanAccessControlComponent
                plans={["ESSENTIAL"]}
                hiddenChildren={<h1>Hidden</h1>}
              >
                <h1 className="font-semibold">Visible</h1>
              </NBPlanAccessControlComponent>
            </td>
            <td>
              <NBPlanAccessControlComponent
                plans={["TEAM"]}
                hiddenChildren={<h1>Hidden</h1>}
              >
                <h1 className="font-semibold">Visible</h1>
              </NBPlanAccessControlComponent>
            </td>
            <td>
              <NBPlanAccessControlComponent
                plans={["BASIC"]}
                hiddenChildren={<h1>Hidden</h1>}
              >
                <h1 className="font-semibold">Visible</h1>
              </NBPlanAccessControlComponent>
            </td>
            <td>
              <NBPlanAccessControlComponent
                plans={["TEAM", "BASIC"]}
                hiddenChildren={<h1>Hidden</h1>}
              >
                <h1 className="font-semibold">Visible</h1>
              </NBPlanAccessControlComponent>
            </td>
          </tr>
        </tbody>
      </table>
      <h1 className="mt-5 text-3xl">Multi access controll</h1>
      <NBAccessControlComponent plans={["ESSENTIAL"]} roles={["OWNER"]}>
        <span>You'll just see this content if your and OWNER in ESSENTIAL</span>
      </NBAccessControlComponent>
    </>
  );
}
