import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { authService } from "../../services/auth.service";
import { useTheme } from "../theme-provider";
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

export const AppBarMenu = () => {
  const { setTheme } = useTheme();
  const navigate = useNavigate();

  const logoutHandler = () => {
    toast.success("Successfully logged out.");
    authService.logout();
    navigate({ to: "/" });
  };

  return (
    <Menubar className="bg-secondary relative h-8 w-8 rounded-full border-none">
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
              <MenubarItem onClick={() => setTheme("light")}>Light</MenubarItem>
              <MenubarItem onClick={() => setTheme("dark")}>Dark</MenubarItem>
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
  );
};
