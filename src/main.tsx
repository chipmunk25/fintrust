import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "adusei-ui/dist/style.css";
import "./tailwind.css";
// import { Icon } from "adusei-ui";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { Toaster } from "sonner";
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
    <Toaster
      // closeButton
      position="top-center"
      // icons={{
      //   success: <Icon name="CircleCheck" className="text-success-500" />,
      //   info: <Icon name="Info" className="text-info-500" />,
      //   warning: <Icon name="ShieldAlert" className="text-warning-500" />,
      //   error: <Icon name="CircleAlert" className="text-danger-500" />,
      // }}
      richColors
      toastOptions={{
        classNames: {
          toast: "w-full max-w-64 rounded-none flex justify-center",
        },
      }}
    />
  </Provider>
);
