import React, { FunctionComponent } from "react";

interface ComponentProps {
  text?: string;
}

const DividerComponent: FunctionComponent<ComponentProps> = ({ text }) => {
  return (
    <div className="relative divider">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300 customizable" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-2 text-sm text-gray-500 customizable">
          {text}
        </span>
      </div>
    </div>
  );
};

export { DividerComponent };
