import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";
import AdminSidebar from "@/components/AdminSidebar";
import { LogOut } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="admin-layout">
      {/* Sidebar - Shadcn UI Style */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>Od. Pierina Villegas</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>Panel de Control</p>
        </div>
        
        <div style={{ flex: 1 }}>
          <AdminSidebar />
        </div>

        {/* Footer / Profile */}
        <div className="admin-sidebar-footer">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>{session.user.name}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{session.user.email}</span>
          </div>
          <SignOutButton 
            className="" 
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--text-muted)', 
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <LogOut size={18} />
          </SignOutButton>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-container">
          {children}
        </div>
      </main>
    </div>
  );
}
