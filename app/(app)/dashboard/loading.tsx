export default function DashboardLoading() {
  return (
    <div style={{ padding: "40px" }}>
      {/* Header skeleton */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ width: 180, height: 44, borderRadius: 8, backgroundColor: "rgba(26,25,24,0.07)" }} />
          <div style={{ width: 60, height: 16, borderRadius: 6, backgroundColor: "rgba(26,25,24,0.05)" }} />
        </div>
        <div style={{ width: 110, height: 34, borderRadius: 10, backgroundColor: "rgba(26,25,24,0.07)" }} />
      </div>

      {/* Board card skeletons */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(26,25,24,0.08)",
              borderRadius: 16,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ width: "60%", height: 18, borderRadius: 6, backgroundColor: "rgba(26,25,24,0.07)" }} />
            <div style={{ width: "90%", height: 14, borderRadius: 6, backgroundColor: "rgba(26,25,24,0.05)" }} />
            <div style={{ width: "70%", height: 14, borderRadius: 6, backgroundColor: "rgba(26,25,24,0.05)" }} />
            <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
              <div style={{ width: 64, height: 12, borderRadius: 6, backgroundColor: "rgba(26,25,24,0.05)" }} />
              <div style={{ width: 64, height: 12, borderRadius: 6, backgroundColor: "rgba(26,25,24,0.05)" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
