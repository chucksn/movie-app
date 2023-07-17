import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app";
import { BrowserRouter } from "react-router-dom";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./redux/reducer/rootReducer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const myStore = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// console.log("store-state", myStore.getState());
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={myStore}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);

myStore.dispatch({ type: "UPDATE_SEARCH", payload: 1 });
