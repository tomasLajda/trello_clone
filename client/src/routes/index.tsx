import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTheme } from "../components/theme-provider";

import icon from "../assets/icon.svg";
import illustration5 from "../assets/illustrations/illustration5.svg";
import { IndexTabList } from "../components/index-tab/index-tab-list";
import { Button } from "../components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  return (
    <>
      <nav className="fixed z-10 flex h-15 w-full flex-row items-center justify-between bg-white shadow-md sm:px-11 2xl:xl:px-16">
        <div className="flex flex-row items-center space-x-2">
          <img
            src={icon}
            alt="Trollo logo"
            className="ml-1 h-auto w-10 sm:w-12"
          />
          <h3 className="font-bold">Trollo</h3>
        </div>
        <div className="flex h-full items-center">
          <div>
            <Link
              to="/login"
              className="h-full pr-3 text-sm sm:px-6 sm:text-lg"
            >
              Log in
            </Link>
          </div>
          <Button className="h-full rounded-none">
            <Link to="/register" className="text-sm sm:text-lg">
              Get Trollo for free
            </Link>
          </Button>
        </div>
      </nav>

      <div className="bg-secondary">
        <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between px-4 py-16 sm:px-12 lg:flex-row xl:px-0">
          <div className="max-w-lg space-y-2 text-center text-blue-950 md:text-left">
            <h1 className="mt-14 sm:leading-12 lg:mt-0 lg:leading-16">
              Capture, organize, and tackle your to-dos from anywhere.
            </h1>
            <p className="lg:text-lg">
              Escape the clutter and chaos—unleash your productivity with
              Trollo.
            </p>
            <Button className="mt-2 w-full sm:w-auto" size="lg">
              <Link to="/register">Sign up - it's free!</Link>
            </Button>
          </div>
          <div>
            <img src={illustration5} alt="" className="w-3xl" />
          </div>
        </div>
      </div>

      <div className="bg-white py-10">
        <div className="container mx-auto max-w-6xl px-4 sm:px-12 xl:px-0">
          <div className="flex flex-col gap-4 text-blue-950">
            <p>TROLLO 101</p>
            <h2>Your productivity powerhouse</h2>
            <p className="max-w-lg text-lg">
              Stay organized and efficient with Inbox, Boards, and Planner.
              Every to-do, idea, or responsibility—no matter how small—finds its
              place, keeping you at the top of your game.
            </p>
          </div>
        </div>
      </div>

      <IndexTabList />

      <footer className="bg-primary py-6 sm:py-4">
        <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between space-y-4 px-12 sm:space-y-0 sm:px-8 md:flex-row xl:px-0">
          <div className="flex flex-row items-center space-x-2">
            <img src={icon} alt="Trollo logo" className="h-auto w-12" />
            <h3 className="text-secondary font-bold">Trollo</h3>
          </div>
          <div className="mb-3 flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 md:mb-0">
            <Link to="/register" className="text-white hover:underline">
              Not registered yet?
            </Link>
            <Link to="/login" className="text-white hover:underline">
              Log in
            </Link>
          </div>
          <p className="text-center text-sm text-white">
            &copy; 2025 All rights reserved | CC0
          </p>
        </div>
      </footer>
    </>
  );
}
