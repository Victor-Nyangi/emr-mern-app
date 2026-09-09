"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconEyeDollar,
  IconFile,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconHospitalCircle,
  IconInnerShadowTop,
  IconMapDollar,
  IconMedicineSyrup,
  IconReport,
  IconSearch,
  IconSettings,
  IconStethoscope,
  IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/layout/nav/nav-documents";
import { NavMain } from "@/components/layout/nav/nav-main";
import { NavSecondary } from "@/components/layout/nav/nav-secondary";
import { NavUser } from "@/components/layout/nav/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Admin",
    email: "deez@mailinator.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/home",
      icon: IconDashboard,
    },
    {
      title: "Patients",
      url: "/patients",
      icon: IconUsers,
    },
    {
      title: "Visits",
      url: "/visits",
      icon: IconStethoscope,
    },
    {
      title: "Departments",
      url: "/departments",
      icon: IconFolder,
    },
    {
      title: "Drugs",
      url: "/drugs",
      icon: IconMedicineSyrup,
    },
    {
      title: "Queues",
      url: "/queues",
      icon: IconFile,
    },
    {
      title: "Services",
      url: "/services",
      icon: IconChartBar,
    },
    {
      title: "Billing",
      url: "/billing",
      icon: IconEyeDollar,
    },
    {
      title: "Financial",
      url: "/financial",
      icon: IconMapDollar,
    },
    {
      title: "Medical Providers",
      url: "/medical-providers",
      icon: IconHospitalCircle,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/support",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "/ask-ai",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Insurance Providers",
      url: "/insurance/insurers",
      icon: IconDatabase,
    },
    {
      name: "Benefit Plans",
      url: "/insurance/benefit-plans",
      icon: IconReport,
    },
    {
      name: "Policies",
      url: "/insurance/policies",
      icon: IconFileWord,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">LifeOfHealth</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
