import React, { FunctionComponent } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

type ConfigObject = {
  items: string[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const ListBoxComponent: FunctionComponent<ConfigObject> = ({
  items,
  selected,
  setSelected,
}) => {
  return (
    <>
      <Listbox value={selected} onChange={setSelected}>
        <Listbox.Button
          className={
            "relative box-border w-full shadow-sm pl-2 pr-5 py-3 border rounded-md border-gray-300 text-start bg-white text-gray"
          }
        >
          {selected}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Listbox.Options
          className={
            "absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg border border-gray-300 sm:text-sm z-10"
          }
        >
          {items.map((item, index) => {
            return (
              <Listbox.Option
                key={index}
                value={item}
                className={(active) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 hover:bg-gray-100 ${
                    active ? "text-gray-900" : "text-gray-900"
                  }`
                }
              >
                {item}
              </Listbox.Option>
            );
          })}
        </Listbox.Options>
      </Listbox>
    </>
  );
};

export { ListBoxComponent };
