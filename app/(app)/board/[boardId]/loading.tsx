export default function BoardLoading() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 64px)" }}>
      {/* Board header skeleton */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "12px 24px",
          borderBottom: "1px solid rgba(26,25,24,0.08)",
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ width: 192, height: 22, borderRadius: 6, backgroundColor: "rgba(26,25,24,0.07)" }} />
          <div style={{ width: 256, height: 12, borderRadius: 6, backgroundColor: "rgba(26,25,24,0.05)" }} />
        </div>
        <div style={{ width: 112, height: 32, borderRadius: 10, backgroundColor: "rgba(26,25,24,0.07)" }} />
      </div>

      {/* Columns skeleton */}
      <div
        style={{
          display: "flex",
          gap: 16,
          overflowX: "auto",
          padding: "16px 24px 24px",
          flex: 1,
        }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "rgba(255,255,255,0.56)",
              border: "1px solid rgba(255,255,255,0.5)",
              borderRadius: 16,
              width: 300,
              flexShrink: 0,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {/* Column header */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "rgba(26,25,24,0.1)" }} />
              <div style={{ width: 120, height: 14, borderRadius: 6, backgroundColor: "rgba(26,25,24,0.08)" }} />
              <div style={{ width: 24, height: 14, borderRadius: 6, backgroundColor: "rgba(26,25,24,0.06)", marginLeft: "auto" }} />
            </div>

            {/* Card skeletons */}
            {Array.from({ length: i % 2 === 0 ? 3 : 2 }).map((_, j) => (
              <div
                key={j}
                style={{
                  backgroundColor: "rgba(255,255,255,0.72)",
                  border: "1px solid rgba(26,25,24,0.06)",
                  borderRadius: 12,
                  padding: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div style={{ width: "75%", height: 14, borderRadius: 6, backgroundColor: "rgba(26,25,24,0.07)" }} />
                <div style={{ width: "100%", height: 12, borderRadius: 6, backgroundColor: "rgba(26,25,24,0.05)" }} />
                <div style={{ width: "60%", height: 12, borderRadius: 6, backgroundColor: "rgba(26,25,24,0.05)" }} />
                <div style={{ display: "flex", gap: 6, marginTop: 2 }}>
                  <div style={{ width: 48, height: 16, borderRadius: 20, backgroundColor: "rgba(26,25,24,0.06)" }} />
                  <div style={{ width: 56, height: 16, borderRadius: 20, backgroundColor: "rgba(26,25,24,0.06)" }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
