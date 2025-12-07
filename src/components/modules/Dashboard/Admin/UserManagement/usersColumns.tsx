"use client";

import { Badge } from "@/components/ui/badge";
import { DateCell } from "@/components/shared/cell/DateCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { IUser, UserRole } from "@/lib/types";

export const usersColumns: Column<IUser>[] = [
  {
    header: "User",
    accessor: (user) => (
      <UserInfoCell
        name={user.name}
        email={user.email}
        photo={user.profilePic}
      />
    ),
    sortKey: "name",
  },
  {
    header: "Role",
    accessor: (user) => (
      <Badge variant={user.role === UserRole.ADMIN ? "default" : user.role === UserRole.GUIDE ? "secondary" : "outline"}>
        {user.role}
      </Badge>
    ),
    sortKey: "role",
  },
  {
    header: "Bio",
    accessor: (user) => (
      <span className="text-sm max-w-[200px] truncate">{user.bio || "N/A"}</span>
    ),
  },
  {
    header: "Languages",
    accessor: (user) => (
      <div className="flex flex-wrap gap-1">
        {user.languagesSpoken && user.languagesSpoken.length > 0 ? (
          user.languagesSpoken.slice(0, 2).map((lang, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {lang}
            </Badge>
          ))
        ) : (
          <span className="text-sm text-muted-foreground">N/A</span>
        )}
        {user.languagesSpoken && user.languagesSpoken.length > 2 && (
          <span className="text-xs text-muted-foreground">+{user.languagesSpoken.length - 2}</span>
        )}
      </div>
    ),
  },
  {
    header: "Expertise",
    accessor: (user) => (
      <div className="flex flex-wrap gap-1">
        {user.expertise && user.expertise.length > 0 ? (
          user.expertise.slice(0, 2).map((cat, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {cat}
            </Badge>
          ))
        ) : (
          <span className="text-sm text-muted-foreground">N/A</span>
        )}
        {user.expertise && user.expertise.length > 2 && (
          <span className="text-xs text-muted-foreground">+{user.expertise.length - 2}</span>
        )}
      </div>
    ),
  },
  {
    header: "Daily Rate",
    accessor: (user) => (
      <span className="text-sm font-medium">
        {user.dailyRate ? `$${user.dailyRate}` : "N/A"}
      </span>
    ),
    sortKey: "dailyRate",
  },
  {
    header: "Rating",
    accessor: (user) => (
      <span className="text-sm font-medium">
        {user.averageRating ? `${user.averageRating.toFixed(1)} ⭐` : "N/A"}
      </span>
    ),
    sortKey: "averageRating",
  },
  {
    header: "Total Tours",
    accessor: (user) => (
      <span className="text-sm">{user.totalToursGiven || 0}</span>
    ),
    sortKey: "totalToursGiven",
  },
  {
    header: "Verified",
    accessor: (user) => (
      <Badge variant={user.verified ? "default" : "outline"}>
        {user.verified ? "Yes" : "No"}
      </Badge>
    ),
    sortKey: "verified",
  },
  {
    header: "Created",
    accessor: (user) => <DateCell date={user.createdAt} />,
    sortKey: "createdAt",
  },
];
