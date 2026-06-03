import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 80px)', width: '100vw', overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', background: 'var(--surface)', borderRight: '1px solid var(--border)', padding: '2rem 1rem', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '2rem', textAlign: 'center' }}>Panel de Control</h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <Link href="/admin" className="btn btn-outline" style={{ textAlign: 'left', display: 'block', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', background: 'var(--surface-alt)' }}>
            📅 Agenda
          </Link>
          <Link href="/admin/patients" className="btn btn-outline" style={{ textAlign: 'left', display: 'block', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', background: 'var(--surface-alt)' }}>
            👥 Pacientes
          </Link>
          <Link href="/admin/finances" className="btn btn-outline" style={{ textAlign: 'left', display: 'block', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', background: 'var(--surface-alt)' }}>
            💰 Finanzas
          </Link>
        </nav>

        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>Dra. Pierina</p>
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto', background: 'var(--background)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
