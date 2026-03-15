const DashboardHeader = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border px-6 lg:px-8">
      <h1 className="text-lg font-semibold font-['DM_Sans']">
        Good morning, Faiz 👋
      </h1>
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          FM
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
