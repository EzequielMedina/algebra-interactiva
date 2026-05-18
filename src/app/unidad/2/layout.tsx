import UnitSidebar from "@/components/layout/UnitSidebar";

export default function Unit2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex gap-8 items-start">
        <aside className="hidden lg:block w-52 flex-shrink-0 sticky top-20">
          <UnitSidebar unit={2} />
        </aside>
        <div className="flex-1 min-w-0">
          <div className="lg:hidden mb-6 overflow-x-auto">
            <div className="flex gap-1 pb-2 w-max">
              <UnitSidebar unit={2} />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
