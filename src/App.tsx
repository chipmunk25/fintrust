import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import { persistor } from "./redux/store";
import rootRoutes from "./routes";

function App() {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={rootRoutes} />
    </PersistGate>
  );
}

export default App;
