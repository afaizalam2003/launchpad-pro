const activities = [
  { id: 1, event: "New user signup", user: "priya@example.com", time: "2 min ago", status: "Success" },
  { id: 2, event: "Payment received", user: "arjun@paytrack.io", time: "15 min ago", status: "Success" },
  { id: 3, event: "API rate limit hit", user: "bot@scraper.com", time: "1 hr ago", status: "Warning" },
  { id: 4, event: "Deployment complete", user: "system", time: "3 hrs ago", status: "Success" },
  { id: 5, event: "Failed login attempt", user: "unknown@test.com", time: "5 hrs ago", status: "Error" },
];

const statusColor: Record<string, string> = {
  Success: "text-primary bg-primary/10",
  Warning: "text-yellow-500 bg-yellow-500/10",
  Error: "text-destructive bg-destructive/10",
};

const RecentActivity = () => {
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
            {activities.map((a) => (
              <tr key={a.id} className="border-b border-border/50 last:border-0 transition-colors hover:bg-secondary/30">
                <td className="px-5 py-3 font-medium">{a.event}</td>
                <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{a.user}</td>
                <td className="px-5 py-3 text-muted-foreground">{a.time}</td>
                <td className="px-5 py-3">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[a.status]}`}>
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivity;
