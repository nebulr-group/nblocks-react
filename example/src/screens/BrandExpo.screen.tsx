import React, { useState } from "react";
import {
  NblocksButton,
  InputComponent,
  LinkComponent,
  HeadingComponent,
  SubHeadingComponent,
  ImageComponent,
  FormComponent,
  TextComponent,
  TogglerComponent,
} from "nblocks-react";
import icon from "../../assets/input-icon.svg";
import iconWarning from "../../assets/input-warning-icon.svg";
import image from "../../assets/demo-image.jpg";

export function BrandExpoScreen() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [enabled, setEnabled] = useState(false);

  return (
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
            src: `${icon}`,
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
            src: `${iconWarning}`,
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
            src: `${icon}`,
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
            src: `${icon}`,
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
            src: `${icon}`,
            alt: "Tool tip icon.",
          }}
        />
      </div>
      <div className="grid">
        <h1 className="mt-5 text-3xl">Links</h1>
        <LinkComponent to={"/"} type={"primary"} size={"sm"} className={"mt-5"}>
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
          Go to Google
        </LinkComponent>
        <LinkComponent
          to={"/"}
          type={"primary"}
          size={"md"}
          className={"mt-5"}
          disabled={true}
        >
          Back to home
        </LinkComponent>
        <LinkComponent
          to={"/home"}
          type={"secondary"}
          className={"mt-5"}
          size={"lg"}
        >
          Back to home
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
      <div className="grid">
        <h1 className="mt-5 text-3xl">Toggler Component</h1>
        <TogglerComponent
          enabled={enabled}
          setEnabled={setEnabled}
        ></TogglerComponent>
      </div>
    </div>
  );
}
