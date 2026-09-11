import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export const AppLayout = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex min-h-screen bg-obsidian">
      <Sidebar />

      <div className="flex w-full flex-col md:pl-64">
        <TopBar title={title} />

        <main className="flex-1 overflow-y-auto px-4 pb-16 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
};
