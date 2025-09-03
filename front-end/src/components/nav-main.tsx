"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function NavMain({
  items,
}: {
  readonly items: readonly {
    readonly title: string;
    readonly url: string;
    readonly icon?: Icon;
    readonly fn?: () => void;
  }[];
}) {
  const router = useRouter();

  const handleCreateMovie = () => {
    router.push("/movies/create");
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Create Movie"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear cursor-pointer"
              onClick={handleCreateMovie}
            >
              <IconCirclePlusFilled />
              <span>Create Movie</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <Link href={item.url} key={item.title} onClick={item.fn}>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={item.title} className="cursor-pointer">
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
