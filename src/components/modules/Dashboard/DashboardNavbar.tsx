import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getNavItemsByRole } from "@/lib/navItems.config";
import { getUserInfo } from "@/services/auth/getUserInfo";

import { IUser } from "@/lib/types";
import DashboardNavbarContent from "./DashboardNavbarContent";

const DashboardNavbar = async () => {
  const userInfo = (await getUserInfo()) as IUser;
  const navItems = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardNavbar;
