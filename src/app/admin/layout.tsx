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
    <div style={{ display: 'flex', height: 'calc(100vh - 80px)', width: '100vw', overflow: 'hidden' }}>
      {/* Sidebar - Shadcn UI Style */}
      <aside style={{ 
        width: '260px', 
        background: 'var(--surface)', 
        borderRight: '1px solid var(--border)', 
        display: 'flex', 
        flexDirection: 'column',
        padding: '1.5rem 1rem'
      }}>
        <div style={{ padding: '0 0.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>Od. Pierina Villegas</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>Panel de Control</p>
        </div>
        
        <div style={{ flex: 1 }}>
          <AdminSidebar />
        </div>

        {/* Footer / Profile */}
        <div style={{ 
          marginTop: 'auto', 
          borderTop: '1px solid var(--border)', 
          paddingTop: '1rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '1rem 0.5rem 0 0.5rem'
        }}>
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
      <main style={{ flex: 1, overflowY: 'auto', background: 'var(--background)' }}>
        <div style={{ padding: '2rem 3rem', maxWidth: '1200px' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
