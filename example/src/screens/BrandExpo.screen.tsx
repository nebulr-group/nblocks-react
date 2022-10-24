import React from "react";
import {
  NblocksButton,
  InputComponent,
  LinkComponent,
  HeadingComponent,
  SubHeadingComponent,
} from "nblocks-react";
import icon from "../../assets/input-icon.svg";
import iconWarning from "../../assets/input-warning-icon.svg";

export function BrandExpoScreen() {
  return (
    <div className="columns-1">
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
          label="Email"
          placeholder="olivia@untitledui.com"
          name="test"
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
          name="password"
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
    </div>
  );
}
