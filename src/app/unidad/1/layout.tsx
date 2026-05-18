import UnitSidebar from "@/components/layout/UnitSidebar";

export default function Unit1Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex gap-8 items-start">
        {/* Sidebar desktop */}
        <aside className="hidden lg:block w-52 flex-shrink-0 sticky top-20">
          <UnitSidebar unit={1} />
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Sidebar mobile: horizontal tabs */}
          <div className="lg:hidden mb-6 overflow-x-auto">
            <div className="flex gap-1 pb-2 w-max">
              <UnitSidebar unit={1} />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
