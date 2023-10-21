import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import "./styles/avatar.styles.css";
import "./styles/buttons.styles.css";
import "./styles/typography.styles.css";
import "./styles/form.styles.css";
import "./styles/table.styles.css";
import "./styles/_card.css";
import "unfonts.css";
import { queryClient } from "./utils";
import setAxiosBaseURL, { tokenAuth } from "@teslo/services";
import { QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

const at = localStorage.getItem("at");
setAxiosBaseURL("/api");
tokenAuth(at);

function fallbackRender({ error }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert" className="flex items-center justify-center min-h-[100vh] flex-col gap-1">
      <div>
        <img src="/img/others/error.png" className="mb-4 w-36" alt="" />
      </div>
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error?.message}</pre>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ErrorBoundary fallbackRender={fallbackRender}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </ErrorBoundary>
);
