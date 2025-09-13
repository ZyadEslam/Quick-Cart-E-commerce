import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./style/globals.css";
import Provider from "./components/Provider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/auth";
import StoreProvider from "./components/StoreProvider";
import { Footer, UserNav } from "./components";

const outfit = Outfit({
  variable: "--font-outfit400",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "QuickCart",
  description: "QuickCart",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.boxicons.com/fonts/basic/boxicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${outfit.variable} antialiased`}
        suppressHydrationWarning
      >
        <Provider session={session}>
          <StoreProvider>
            <UserNav />
            <main>{children}</main>
            <Footer />
          </StoreProvider>
        </Provider>
      </body>
    </html>
  );
}
