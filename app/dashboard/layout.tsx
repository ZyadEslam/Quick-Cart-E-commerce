import React from "react";
import DashboardSideNav from "../components/DashboardSideNav";

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <DashboardSideNav />
      <div>{children}</div>
    </div>
  );
};

export default Dashboardlayout;
