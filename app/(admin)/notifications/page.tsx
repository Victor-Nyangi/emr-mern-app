"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_NOTIFICATIONS } from "@/lib/graphql/notifications";
import { List } from "@/components/shared/List";
import { columns } from "@/components/notifications/columns";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
  const { data, loading, error } = useQuery(GET_NOTIFICATIONS);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (data?.notifications) {
      setNotifications(data.notifications);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-700 mx-auto"></div>
            <p className="mt-2 text-muted-foreground">
              Loading notifications...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-500">
              Error loading notifications: {error.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const unreadCount = notifications.filter((n: any) => !n.read).length;

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-teal-700">
              Notifications
            </h2>
            <p className="text-muted-foreground">
              Manage your system notifications
            </p>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Bell className="h-3 w-3" />
              {unreadCount} unread
            </Badge>
          </div>
        </div>
        <List columns={columns} data={notifications} filter_key="message" />
      </div>
    </>
  );
}
