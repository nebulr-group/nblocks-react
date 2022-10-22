import { AuthRoutes } from "./routes/AuthRoutes";
import { useAuth } from "./hooks/auth-context";
import { NblocksProvider } from "./providers/NblocksProvider/NblocksProvider";
import { useApp } from "./hooks/app-context";
import { SetupRoutes } from "./routes/SetupRoutes";
import { NblocksButton } from "./components/shared/NblocksButton";
import { InputComponent } from "./components/shared/InputComponent";
import { LinkComponent } from "./components/shared/LinkComponent";
import "./index.css";

export {
  AuthRoutes,
  SetupRoutes,
  useAuth,
  useApp,
  NblocksProvider,
  NblocksButton,
  InputComponent,
  LinkComponent,
};
