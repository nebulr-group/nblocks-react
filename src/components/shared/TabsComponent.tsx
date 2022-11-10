import React, { FunctionComponent } from "react";
import { Tab } from "@headlessui/react";
import { className } from "../../utils/ComponentHelpers";

type ConfigObject = {
  categories: string[];
  onChange: (index: number) => void;
  selectedIndex?: number;
};

const TabsComponent: FunctionComponent<ConfigObject> = ({
  categories,
  onChange,
  selectedIndex,
}) => {
  return (
    <Tab.Group onChange={onChange} selectedIndex={selectedIndex}>
      <Tab.List
        className={"inline-flex space-x-2 rounded-xl bg-gray-100 p-1.5"}
      >
        {categories.map((type) => (
          <Tab
            key={type}
            className={({ selected }) =>
              className(
                "py-2.5 px-3.5 font-semibold rounded-md",
                selected
                  ? "bg-white hover:bg-white shadow-sm text-gray-900"
                  : "text-gray-500 hover:bg-gray-200"
              )
            }
          >
            {type}
          </Tab>
        ))}
      </Tab.List>
      {/* Add panels */}
    </Tab.Group>
  );
};

export { TabsComponent };
