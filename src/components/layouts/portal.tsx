import {
  LoaderFunction,
  LoaderFunctionArgs,
  Outlet,
  redirect,
} from "react-router-dom";
import { WavyBackground } from "../wavy";
import { routes } from "~/lib/constants";
import { loadSessionStore } from "~/redux/session";

const PortalLayout = () => {
  return (
    <WavyBackground className="w-screen h-screen px-24 py-12 ">
      <div className="container mx-auto rounded-md ">
        <div className="shadow-lg">
          <div className="w-full p-12 text-white bg-green-800 h-36 rounded-t-md">
            <span className="text-3xl">Loan Application Request Form</span>
          </div>
          <div className="w-full h-full px-4 py-2 bg-white ">
            <Outlet />
          </div>
        </div>
      </div>
    </WavyBackground>
  );
};

export const protectedLoader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  const params = new URLSearchParams();

  const auth = await loadSessionStore();
  const userId = auth?.userId;

  if (!userId) {
    params.set("redirectTo", new URL(request.url).pathname);

    return redirect(`${routes.login()}?` + params.toString());
  }

  if (new URL(request.url).pathname === "/") {
    return redirect(`${routes.home()}`);
  }

  return null;
};

export default PortalLayout;
