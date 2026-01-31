// This component is now deprecated in favor of AdminApp.jsx which uses the new layout
// with proper sidebar integration
export default function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <main style={{ flex: 1, padding: 24 }}>
        {children}
      </main>
    </div>
  );
}
