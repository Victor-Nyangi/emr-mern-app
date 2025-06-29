import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/settings/SidebarNav";

const sidebarSettingsItems = [
  {
    title: "Account",
    href: "/settings",
  },
  {
    title: "Profile",
    href: "/settings/profile",
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
  },
  {
    title: "Display",
    href: "/settings/display",
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  return (
    <>
      <main>
        <div className="space-y-6 p-8 pb-16 md:block">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight text-teal-700">Settings</h2>
            <p className="text-muted-foreground">
              Manage your account settings and set e-mail preferences.
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex space-y-8 flex-row space-x-12">
            <aside>
              <SidebarNav items={sidebarSettingsItems} />
            </aside>
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </main>
    </>
  );
}
