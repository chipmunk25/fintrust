import { Outlet } from "react-router-dom";
import LoginPageSideImage from "~/assets/bg.jpg";

const Layout = () => {
  return (
    <section className="flex w-full h-full ">
      <div className="relative w-full ">
        <img
          className="absolute inset-0 object-cover w-full h-full"
          src={LoginPageSideImage}
        />
      </div>
      <div className="flex w-full items-center justify-center bg-[#ffffff] px-4">
        <Outlet />
      </div>
    </section>
  );
};

export default Layout;
