import { Search, Bell, CircleHelp } from "lucide-react";

export const TopBar = ({ title }: { title: string }) => {
  return (
    <header className="fixed right-0 top-0 z-40 flex h-16 w-full items-center justify-between border-b border-outline-soft bg-surface/80 px-6 backdrop-blur-md md:w-[calc(100%-16rem)]">
      <h2 className="font-[Newsreader] text-xl font-medium text-on-surface">
        {title}
      </h2>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Search"
          className="text-soft-gray transition hover:text-primary"
        >
          <Search className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative text-soft-gray transition hover:text-primary"
        >
          <Bell className="h-[18px] w-[18px]" strokeWidth={1.75} />
          <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-error" />
        </button>

        <button
          type="button"
          aria-label="Help"
          className="text-soft-gray transition hover:text-primary"
        >
          <CircleHelp className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </button>
      </div>
    </header>
  );
};
