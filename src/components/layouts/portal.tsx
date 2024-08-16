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
    <WavyBackground className="w-screen h-screen px-2 md:px-24 py-6 md:py-12">
      <div className=" mx-auto rounded-md">
        <div className="shadow-lg">
          <div className="w-full p-4 md:p-8 lg:p-12 text-white bg-green-800 h-28 md:h-32 lg:h-36 rounded-t-md">
            <span className="text-lg md:text-2xl lg:text-3xl">
              Loan Application Request Form
            </span>
          </div>
          <div className="w-full h-full p-4 md:px-6 lg:px-8 md:py-6 bg-white">
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
