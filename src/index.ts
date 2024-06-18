/**
 * Hot Fix
 * process is not defined
 * ReferenceError: process is not defined
 */

(window as any).process = {
    ...(window as any).process,
};

export { TestComponent } from "./components/Test";
export { LoginComponent } from "./components/Login";
export { CallbackComponent } from "./components/Callback";
export { LogoutComponent } from "./components/Logout";
export { ProtectedRouteComponent } from "./components/ProtectedRoute";
export { FeatureFlagComponent } from "./components/FeatureFlag";
export { TeamComponent } from "./components/Team";
export { SubscriptionComponent } from "./components/Subscription";

export { NblocksProvider } from "./providers/NblocksProvider";
export type { LibConfig } from "./providers/ConfigProvider";

export { useFlags } from "./hooks/UseFlags";
export { useNblocksClient } from "./hooks/UseNblocksClient";
export { useTokens } from "./hooks/UseTokens";
export { useMe } from "./hooks/UseMe"; 