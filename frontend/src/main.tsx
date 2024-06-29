import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import store from "@store/store";

import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
