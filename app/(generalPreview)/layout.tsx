"use client";
import { Footer, UserNav } from "../components";
import { usePathname } from "next/navigation";

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <>
      <UserNav />
      <main>{children}</main>
      {pathname !== "/dashboard" && <Footer />}
    </>
  );
};

export default GeneralLayout;
