import {  SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import DashboardWrapper from "@/components/layouts/Dashboard";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <DashboardWrapper />
      <div className="w-full flex flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 md:hidden">
          <SidebarTrigger className="-ml-1" />
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
