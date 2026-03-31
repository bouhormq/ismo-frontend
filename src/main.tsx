import * as Sentry from "@sentry/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import App from "./App.tsx";
import "./index.css";
import AuthProvider from "./providers/auth.provider.tsx";
import GeneralProvider from "./providers/general.provider.tsx";
import NotificationsProvider from "./providers/notifications.provider.tsx";
import "./styles/globals.scss";
import { getErrorMessage } from "./utils/functions/misc.functions.ts";

Sentry.init({
  dsn: "https://cdf1029f08d635e5f4e27a7039cb5dd8@o1180561.ingest.us.sentry.io/4508880796778496",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", "https://staging.ismomat.com/"],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onSuccess() {
        toast.success("Succès");
      },
      onError: (error) => {
        toast.error(getErrorMessage(error as AxiosError));
      },
    },
  },
});

// eslint-disable-next-line
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GeneralProvider>
        <AuthProvider>
          <NotificationsProvider>
            <BrowserRouter>
              <App />
              <ToastContainer position="bottom-right" />
            </BrowserRouter>
          </NotificationsProvider>
        </AuthProvider>
      </GeneralProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
