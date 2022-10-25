import { AuthRoutes } from "./routes/AuthRoutes";
import { useAuth } from "./hooks/auth-context";
import { NblocksProvider } from "./providers/NblocksProvider/NblocksProvider";
import { useApp } from "./hooks/app-context";
import { SetupRoutes } from "./routes/SetupRoutes";
import { UserRoutes } from "./routes/UserRoutes";
import { AuthGuard } from "./routes/AuthGuard";
import { AccessControllComponent } from "./components/helpers/AccessControllComponent";
import { LibConfig } from "./models/lib-config";
import { useConfig } from "./hooks/config-context";
import { OnboardRoutes } from "./routes/OnboardRoutes";

export { useConfig, AuthGuard, AuthRoutes, OnboardRoutes, SetupRoutes, UserRoutes, useAuth, useApp, NblocksProvider, AccessControllComponent };
export type { LibConfig };
