import { useEffect, useState } from "react";
import React from "react";

export default function FeatureFlag({
  children,
  flag,
  defaultValue,
}: {
  children: React.ReactElement;
  flag: string;
  defaultValue?: boolean;
}) {
  const APP_ID = "633402fdf28d8e00252948b1";

  const [enabled, setEnabled] = useState(defaultValue ? defaultValue : false);

  useEffect(() => {
    // Retrieve the access token JWT from localstorage
    const accessToken = window.localStorage.getItem("access_token");
    if (accessToken) {
      //identifyEevaluateFlag(accessToken);
      identifyUser(accessToken).then(() => evaluateFlag());
    }
  }, []);

  const identifyUser = async (accessToken: string) => {
    await fetch(`http://localhost:3080/flags/identify/${APP_ID}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken,
        context: {
          device: {
            key: "iphone",
          },
        },
      }),
    });
  };

  const evaluateFlag = async () => {
    const result = await fetch(
      `http://localhost:3080/flags/evaluate/${APP_ID}/${flag}`,
      { credentials: "include" }
    ).then((res) => res.json());
    setEnabled(result.enabled);
  };

  const identifyEevaluateFlag = async (accessToken: string) => {
    const result = await fetch(
      `http://localhost:3080/flags/evaluate/${APP_ID}/${flag}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken,
          context: {
            device: {
              key: "iphone",
            },
          },
        }),
      }
    ).then((res) => res.json());
    setEnabled(result.enabled);
  };

  // Only if granted should we render the component children
  if (enabled) return children;
  else return null;
}
