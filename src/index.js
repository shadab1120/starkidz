import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import "./assets/scss/dashlite.scss";
import "./assets/scss/style-email.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
const Error404Modern = lazy(() => import("./pages/error/404-modern"));

const queryClient = new QueryClient();
let persistor = persistStore(store);
const env = process.env.REACT_APP_NODE_ENV;

ReactDOM.render(
  <React.Fragment>
    <Suspense fallback={<div />}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Router basename={env === "production" ? "" : ""}>
              <Route
                render={({ location }) => (location.state && location.state.is404 ? <Error404Modern /> : <App />)}
              />
            </Router>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </Suspense>
  </React.Fragment>,
  document.getElementById("root")
);
