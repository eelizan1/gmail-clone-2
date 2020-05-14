import React, { FunctionComponent } from "react";
import Dashboard from "../components/features/Dashboard/Dashboard";
import { store } from "./redux";
import { Provider } from "react-redux";

const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Dashboard />
      </div>
    </Provider>
  );
};

export default App;
