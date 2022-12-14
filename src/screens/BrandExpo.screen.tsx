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
import { RoleAccessControllComponent } from "../components/shared/RoleAccessControllComponent";
import { PlanAccessControllComponent } from "../components/shared/PlanAccessControllComponent";

export function BrandExpoScreen() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [enabled, setEnabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const image =
    "https://cdn.shopify.com/s/files/1/0980/9736/articles/jessica-felicio-_cvwXhGqG-o-unsplash.jpg?v=1595591981";

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
              <ImageComponent src={"image"}></ImageComponent>
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
        <div className="grid">
          <h1 className="mt-5 text-3xl">Text Comopnent</h1>
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
          />
        </div>
        <div className="w-full">
          <h1 className="mt-5 text-3xl">User List Component</h1>
          <UserListTableComponent />
        </div>
      </div>
      <h1 className="mt-5 text-3xl">Role Access control</h1>
      <table>
        <thead>
          <th>OWNER</th>
          <th>ADMIN</th>
          <th>MANAGER</th>
          <th>VIEWER</th>
          <th>OWNER or ADMIN</th>
        </thead>
        <tbody>
          <tr>
            <td>
              <RoleAccessControllComponent
                roles={["OWNER"]}
                hiddenChildren={<h1>Hidden</h1>}
              >
                <h1 className="font-semibold">Visible</h1>
              </RoleAccessControllComponent>
            </td>
            <td>
              <RoleAccessControllComponent
                roles={["ADMIN"]}
                hiddenChildren={<h1>Hidden</h1>}
              >
                <h1 className="font-semibold">Visible</h1>
              </RoleAccessControllComponent>
            </td>
            <td>
              <RoleAccessControllComponent
                roles={["MANAGER"]}
                hiddenChildren={<h1>Hidden</h1>}
              >
                <h1 className="font-semibold">Visible</h1>
              </RoleAccessControllComponent>
            </td>
            <td>
              <RoleAccessControllComponent
                roles={["VIEWER"]}
                hiddenChildren={<h1>Hidden</h1>}
              >
                <h1 className="font-semibold">Visible</h1>
              </RoleAccessControllComponent>
            </td>
            <td>
              <RoleAccessControllComponent
                roles={["OWNER", "ADMIN"]}
                hiddenChildren={<h1>Hidden</h1>}
              >
                <h1 className="font-semibold">Visible</h1>
              </RoleAccessControllComponent>
            </td>
          </tr>
        </tbody>
      </table>
      <h1 className="mt-5 text-3xl">Plan Access control</h1>
      <table>
        <thead>
          <th>FREEMIUM</th>
          <th>ESSENTIAL</th>
          <th>TEAM</th>
          <th>BASIC</th>
          <th>TEAM or BASIC</th>
        </thead>
        <tbody>
          <tr>
            <td>
              <PlanAccessControllComponent
                plans={["FREEMIUM"]}
                hiddenChildren={<h1>Hidden</h1>}
              >
                <h1 className="font-semibold">Visible</h1>
              </PlanAccessControllComponent>
            </td>
            <td>
              <PlanAccessControllComponent
                plans={["ESSENTIAL"]}
                hiddenChildren={<h1>Hidden</h1>}
              >
                <h1 className="font-semibold">Visible</h1>
              </PlanAccessControllComponent>
            </td>
            <td>
              <PlanAccessControllComponent
                plans={["TEAM"]}
                hiddenChildren={<h1>Hidden</h1>}
              >
                <h1 className="font-semibold">Visible</h1>
              </PlanAccessControllComponent>
            </td>
            <td>
              <PlanAccessControllComponent
                plans={["BASIC"]}
                hiddenChildren={<h1>Hidden</h1>}
              >
                <h1 className="font-semibold">Visible</h1>
              </PlanAccessControllComponent>
            </td>
            <td>
              <PlanAccessControllComponent
                plans={["TEAM", "BASIC"]}
                hiddenChildren={<h1>Hidden</h1>}
              >
                <h1 className="font-semibold">Visible</h1>
              </PlanAccessControllComponent>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
