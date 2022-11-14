import React, { FunctionComponent } from "react";
import { classNameFilter } from "../../utils/ComponentHelpers";

type ConfigObject = {
  className?: string;
};

const SkeletonLoader: FunctionComponent<ConfigObject> = ({ className }) => {
  return (
    <div
      className={classNameFilter(className, "grow animate-pulse bg-gray-300")}
    ></div>
  );
};

export { SkeletonLoader };
