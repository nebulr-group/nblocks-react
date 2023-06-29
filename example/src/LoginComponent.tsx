import React, { useEffect } from "react";

export default function LoginComponent() {
  //const APP_ID = "647887039bc85f00088fba57";
  
  useEffect(() => {
    // Immediately redirect the web browser to Nblocks login
    window.location.replace(
      `https://auth-stage.nblocks.cloud/url/login/${APP_ID}`
    );
  });

  return <div></div>;
}
