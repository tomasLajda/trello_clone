import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppBar } from "../components/app-bar/app-bar";

export const Route = createFileRoute("/_app")({
  component: () => (
    <div className="max-h-screen overflow-x-auto overflow-y-hidden">
      <AppBar />
      <Outlet />
    </div>
  ),
});
