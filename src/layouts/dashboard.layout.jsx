import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet, useNavigate } from "react-router";
import { ModeToggle } from "@/components/mode-toggle";

export default function DashboardLayout() {
  const navigate = useNavigate();

  if (!localStorage.getItem("token")) {
    navigate("/");
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "19rem",
      }}
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 justify-between">
          <SidebarTrigger className="-ml-1" />
          <ModeToggle />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
