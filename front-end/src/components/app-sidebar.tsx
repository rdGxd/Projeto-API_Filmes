"use client";

import {
  IconChartBar,
  IconDashboard,
  IconDeviceTv,
  IconLogout,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { userService } from "@/services/userService";
import Cookies from "js-cookie";
import Link from "next/link";
import { redirect } from "next/navigation";

const data = {
  navMain: [
    {
      title: "Todos os filmes",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Favorites",
      url: "/favorites",
      icon: IconChartBar,
    },
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
    {
      title: "Logout",
      url: "/",
      icon: IconLogout,
      fn: async () => {
        await userService.logout();
      },
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  React.useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    if (!accessToken || !refreshToken) {
      return redirect("/");
    }
  });

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/dashboard">
                <IconDeviceTv className="!size-5" />
                <span className="text-base font-semibold">API Movies</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
