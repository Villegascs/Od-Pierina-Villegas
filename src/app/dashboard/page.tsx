import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { requestAppointment } from "@/app/actions/appointment";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  if (session.user.role === "ADMIN") {
    redirect("/admin");
  }

  const appointments = await prisma.appointment.findMany({
    where: { patientId: session.user.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--primary)' }}>Hola, {session.user.name}</h1>
        <form action="/api/auth/signout" method="POST">
          <button type="submit" className="btn btn-outline">Cerrar Sesión</button>
        </form>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <section className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Solicitar Nueva Cita</h2>
          
          <form action={async (formData) => {
            'use server';
            const date = formData.get('date') as string;
            const reason = formData.get('reason') as string;
            await requestAppointment(date, reason);
          }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <div>
              <label className="label">Día sugerido para la cita</label>
              <input type="date" name="date" className="input-field" required />
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                La doctora Pierina confirmará la hora exacta. Horario libre desde las 8:00 AM.
              </p>
            </div>

            <div>
              <label className="label">Motivo de la consulta</label>
              <textarea name="reason" className="input-field" rows={3} placeholder="Limpieza, dolor, blanqueamiento..." required></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Solicitar Cita
            </button>
          </form>
        </section>

        <section className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Historial de Citas</h2>
          
          {appointments.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No tienes citas registradas.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {appointments.map((app: any) => (
                <div key={app.id} style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem', background: 'var(--surface-alt)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <strong>{app.requestedDate ? new Date(app.requestedDate).toLocaleDateString() : 'Sin fecha'}</strong>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600,
                      backgroundColor: app.status === 'PENDING' ? 'var(--warning)' : app.status === 'ACCEPTED' ? 'var(--success)' : 'var(--danger)',
                      color: 'white'
                    }}>
                      {app.status === 'PENDING' ? 'Pendiente' : app.status === 'ACCEPTED' ? 'Aceptada' : 'Rechazada'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Motivo: {app.reason}</p>
                  
                  {app.status === 'ACCEPTED' && app.agendaDate && (
                    <div style={{ marginTop: '0.5rem', padding: '0.75rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid var(--success)' }}>
                      <strong>¡Cita Confirmada!</strong><br />
                      Fecha y Hora: {new Date(app.agendaDate).toLocaleString()}<br />
                      Duración estimada: {app.durationMins} minutos.
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
