import WrappedRoutes from "components/WrappedRoutes";
import { HashRouter } from "react-router-dom";
import routesData from "config/routes";

import "./App.css";

function App() {
  return (
    <HashRouter>
      <WrappedRoutes routes={routesData} />
    </HashRouter>
  );
}

export default App;
