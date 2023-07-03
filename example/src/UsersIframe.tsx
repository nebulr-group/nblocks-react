import React, { useEffect, useState } from "react";

export default function UserList() {
  const [url, setUrl] = useState<string>();

  const APP_ID = "647887039bc85f00088fba57";

  useEffect(() => {
    createUrl();
  }, []);

  const createUrl = async () => {
    // Retrieve the access token JWT from localstorage
    const accessToken = window.localStorage.getItem("access_token");

    // Get the handover code from Nblocks
    const result = await fetch(
      `https://auth-stage.nblocks.cloud/handover/code/${APP_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken,
        }),
      }
    ).then((res) => res.json());

    // Create the user management portal url
    setUrl(
      `https://backendless-stage.nblocks.cloud/user-management-portal/users?code=${result.code}`
    );
  };

  // Render the url as an iframe
  return <iframe width="100%" height="500px" src={url}></iframe>;
}
