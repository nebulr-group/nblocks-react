import React from "react";
import FeatureFlag from "./FeatureFlag";

export default function FlagsComponent() {
  return (
    <>
      <h1>Welcome to flags</h1>

      <FeatureFlag flag="basic-feature">
        <h2>Basic feature</h2>
      </FeatureFlag>

      <FeatureFlag flag="iphone-feature">
        <h2>iPhone feature</h2>
      </FeatureFlag>

      <FeatureFlag flag="premium-feature">
        <h2>Premium feature</h2>
      </FeatureFlag>

      <FeatureFlag flag="analytics-feature">
        <h2>Analytics feature</h2>
      </FeatureFlag>
    </>
  );
}
