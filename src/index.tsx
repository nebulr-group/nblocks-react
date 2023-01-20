import "./index.css";
import { AuthRoutes } from "./routes/AuthRoutes";
import { useAuth } from "./hooks/auth-context";
import { NblocksProvider } from "./providers/NblocksProvider/NblocksProvider";
import { useApp } from "./hooks/app-context";
import { SetupRoutes } from "./routes/SetupRoutes";
import { UserRoutes } from "./routes/UserRoutes";
import { LibConfig } from "./models/lib-config";
import { OnboardRoutes } from "./routes/OnboardRoutes";
import { InstallationCompleteComponent } from "./components/shared/InstallationCompleteComponent";
import { TenantRoutes } from "./routes/TenantRoutes";
import { useSecureContext } from "./hooks/secure-http-context";
import { NBPlanAccessControlComponent } from "./components/shared/access-control/PlanAccessControllComponent";
import { NBAccessControlComponent } from "./components/shared/access-control/AccessControllComponent";
import { NBRoleAccessControlComponent } from "./components/shared/access-control/RoleAccessControllComponent";
import { NBAuthGuard } from "./routes/AuthGuard";
import { NBPlanAccessControlGuard } from "./routes/PlanAccessControlGuard";
import { NBAccessControlGuard } from "./routes/AccessControlGuard";
import { NBRoleAccessControlGuard } from "./routes/RoleAccessControlGuard";
import { SpaRouter } from "./routes/SpaRouter";

export {
  NblocksProvider,
  useSecureContext,
  useAuth,
  useApp,
  NBRoleAccessControlComponent,
  NBPlanAccessControlComponent,
  NBAccessControlComponent,
  NBAuthGuard,
  NBPlanAccessControlGuard,
  NBRoleAccessControlGuard,
  NBAccessControlGuard,
  SpaRouter,
  AuthRoutes,
  OnboardRoutes,
  SetupRoutes,
  UserRoutes,
  TenantRoutes,
  InstallationCompleteComponent,
};

export type { LibConfig };
