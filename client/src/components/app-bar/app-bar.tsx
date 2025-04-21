import { Outlet, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import icon from "../../assets/icon.svg";
import { authService } from "../../services/auth.service";
import { useTheme } from "../theme-provider";
import { Button } from "../ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../ui/menubar";

export const AppBar = () => {
  const { setTheme } = useTheme();
  const navigate = useNavigate();

  const logoutHandler = () => {
    toast.success("Successfully logged out.");
    authService.logout();
    navigate({ to: "/" });
  };

  return (
    <>
      <nav className="flex items-center justify-between px-2 py-1 shadow-xl">
        <div className="flex items-center space-x-4">
          <a href="/dashboard" className="mr-6 flex items-center space-x-1">
            <img src={icon} className="w-10" alt="Trollo logo" />
            <h3 className="font-bold">Trollo</h3>
          </a>
          <Button>Create</Button>
        </div>
        <Menubar className="bg-primary relative h-8 w-8 rounded-full">
          <MenubarMenu>
            <MenubarTrigger className="absolute inset-0 flex items-center justify-center">
              TE
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Settings</MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Theme</MenubarSubTrigger>
                <MenubarSubContent className="mr-2">
                  <MenubarItem onClick={() => setTheme("light")}>
                    Light
                  </MenubarItem>
                  <MenubarItem onClick={() => setTheme("dark")}>
                    Dark
                  </MenubarItem>
                  <MenubarItem onClick={() => setTheme("system")}>
                    Match System
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem onClick={logoutHandler}>Log out</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};
