import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LoginPageSideImage from "~/assets/bg.jpg";
import { routes } from "~/lib/constants";

const imageMap = {
  [routes.login()]: LoginPageSideImage,
};
const Layout = () => {
  const location = useLocation();
  const [sideImageSource, setSideImageSource] = useState(
    imageMap[location.pathname]
  );

  useEffect(() => {
    setSideImageSource(imageMap[location.pathname]);
  }, [location]);

  return (
    <section className="flex w-full h-full ">
      <div className="relative w-full ">
        <img
          className="absolute inset-0 object-cover w-full h-full"
          src={sideImageSource}
        />
      </div>
      <div className="flex w-full items-center justify-center bg-[#ffffff] px-4">
        <Outlet />
      </div>
    </section>
  );
};

export default Layout;
