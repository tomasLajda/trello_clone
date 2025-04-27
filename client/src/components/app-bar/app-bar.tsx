import { Link } from "@tanstack/react-router";
import icon from "../../assets/icon.svg";
import { AppBarCreate } from "./app-bar-create";
import { AppBarMenu } from "./app-bar-menu";

export const AppBar = () => {
  return (
    <>
      <nav className="bg-primary border-secondary fixed flex w-full items-center justify-between border-b-[1px] px-2 py-1">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="mr-6 flex items-center space-x-1">
            <img src={icon} className="w-10" alt="Trollo logo" />
            <h3 className="font-bold">Trollo</h3>
          </Link>
          <AppBarCreate />
        </div>
        <AppBarMenu />
      </nav>
    </>
  );
};
