import React, { FunctionComponent } from "react";

type ConfigObject = {
  className?: string;
};

const SkeletonLoader: FunctionComponent<ConfigObject> = ({ className }) => {
  className = className ? className + " " : "";
  return <div className={`${className}grow animate-pulse bg-gray-300`}></div>;
};

export { SkeletonLoader };
