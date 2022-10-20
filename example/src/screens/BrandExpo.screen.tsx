import React from "react";
import { NblocksButton } from "nblocks-react";

export function BrandExpoScreen() {
  return (
    <div className="columns-1">
      <h1 className="w-full">Brand Expo</h1>
      <NblocksButton
        type="primary"
        size="xl"
        disabled={false}
        onClick={() => console.log("Hello World!")}
      >
        Button
      </NblocksButton>
    </div>
  );
}
