import React from "react";
import { useConfig } from "../providers/ConfigProvider";

const TestComponent = () => {

	const { appId } = useConfig()

	return (<p>Hello world from Nblocks with app id {appId}!</p>)
}

export {TestComponent};
