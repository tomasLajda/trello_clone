import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTheme } from "../components/theme-provider";

import logo from "../assets/logo.png";
import { ModeToggle } from "../components/mode-toggle";

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
      <nav className="bg-secondary-foreground flex flex-row items-center justify-around">
        <img src={logo} alt="Trollo logo" className="w-24" />
        <div className="flex h-full gap-4">
          <Link to="/login">Log in</Link>
          <Link to="/register" className="bg-primary h-full">
            Get Trello for free
          </Link>
          <ModeToggle />
        </div>
      </nav>
    </>
  );
}
