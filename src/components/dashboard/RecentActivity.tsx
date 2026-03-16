import { useRecentActivity, formatTimeAgo } from "@/hooks/useRecentActivity";
import { Skeleton } from "@/components/ui/skeleton";

const statusColor: Record<string, string> = {
  success: "text-primary bg-primary/10",
  warning: "text-yellow-500 bg-yellow-500/10",
  error: "text-destructive bg-destructive/10",
};

const RecentActivity = () => {
  const { activities, loading, error } = useRecentActivity();

  const getStatusClass = (status: string): string => {
    const key = (status ?? "success").toLowerCase();
    return statusColor[key] ?? statusColor.success;
  };

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-sm font-semibold font-['DM_Sans']">Recent Activity</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-5 py-3 font-medium">Event</th>
              <th className="px-5 py-3 font-medium">User</th>
              <th className="px-5 py-3 font-medium">Time</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0">
                  <td className="px-5 py-3">
                    <Skeleton className="h-4 w-28" />
                  </td>
                  <td className="px-5 py-3">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="px-5 py-3">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="px-5 py-3">
                    <Skeleton className="h-5 w-14 rounded-full" />
                  </td>
                </tr>
              ))
            ) : error ? (
              <tr>
                <td colSpan={4} className="px-5 py-6 text-center text-sm text-muted-foreground">
                  —
                </td>
              </tr>
            ) : activities.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-6 text-center text-sm text-muted-foreground">
                  No activity yet
                </td>
              </tr>
            ) : (
              activities.map((a) => (
                <tr
                  key={a.id}
                  className="border-b border-border/50 last:border-0 transition-colors hover:bg-secondary/30"
                >
                  <td className="px-5 py-3 font-medium">{a.event}</td>
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">
                    {a.user_email ?? "—"}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">
                    {formatTimeAgo(a.created_at)}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusClass(a.status)}`}
                    >
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivity;
