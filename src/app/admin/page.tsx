import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getAdminAppointments, acceptAppointment, rejectAppointment } from "@/app/actions/appointment";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const { pending, accepted, history } = await getAdminAppointments();

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--primary)' }}>Panel de Administración - Dra. Pierina</h1>
        <form action="/api/auth/signout" method="POST">
          <button type="submit" className="btn btn-outline">Cerrar Sesión</button>
        </form>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        
        {/* Columna Izquierda: Pendientes e Historial */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <section className="glass-panel" style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--warning)' }}>Citas Pendientes ({pending.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pending.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No hay solicitudes nuevas.</p>}
              {pending.map((app: any) => (
                <div key={app.id} style={{ border: '1px solid var(--border)', padding: '1rem', borderRadius: '8px', background: 'white' }}>
                  <p><strong>Paciente:</strong> {app.patient.firstName} {app.patient.lastName}</p>
                  <p><strong>Fecha sugerida:</strong> {app.requestedDate ? new Date(app.requestedDate).toLocaleDateString() : 'N/A'}</p>
                  <p><strong>Motivo:</strong> {app.reason}</p>
                  
                  <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                    <form action={async (formData) => {
                      'use server';
                      const datetime = formData.get('datetime') as string;
                      const duration = parseInt(formData.get('duration') as string);
                      await acceptAppointment(app.id, datetime, duration);
                    }} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem' }}>Fijar Fecha y Hora Exacta:</label>
                      <input type="datetime-local" name="datetime" className="input-field" style={{ padding: '0.5rem' }} required />
                      
                      <label style={{ fontSize: '0.85rem' }}>Duración (minutos):</label>
                      <input type="number" name="duration" defaultValue={30} className="input-field" style={{ padding: '0.5rem' }} required />
                      
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '0.5rem' }}>Aceptar y Agendar</button>
                        <button formAction={async () => {
                          'use server';
                          await rejectAppointment(app.id);
                        }} className="btn btn-secondary" style={{ padding: '0.5rem' }}>Rechazar</button>
                      </div>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-panel" style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>Historial Reciente</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
              {history.slice(0, 10).map((app: any) => (
                <div key={app.id} style={{ fontSize: '0.85rem', padding: '0.5rem', borderBottom: '1px solid var(--border)' }}>
                  <strong>{app.patient.firstName} {app.patient.lastName}</strong> - 
                  <span style={{ color: app.status === 'REJECTED' ? 'var(--danger)' : 'var(--text-muted)' }}> {app.status === 'REJECTED' ? 'Rechazada' : 'Atendida'}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Columna Derecha: Agenda */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section className="glass-panel" style={{ padding: '2rem', height: '100%' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--success)' }}>Agenda - Citas Aceptadas</h2>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              {accepted.length === 0 && <p style={{ color: 'var(--text-muted)' }}>La agenda está libre.</p>}
              {accepted.map((app: any) => (
                <div key={app.id} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  padding: '1rem 1.5rem', 
                  borderRadius: '12px', 
                  background: 'var(--surface-alt)',
                  borderLeft: '6px solid var(--primary)'
                }}>
                  <div style={{ flexShrink: 0, textAlign: 'center', width: '100px' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--secondary)' }}>
                      {app.agendaDate ? new Date(app.agendaDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>
                      {app.agendaDate ? new Date(app.agendaDate).toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' }) : ''}
                    </div>
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{app.patient.firstName} {app.patient.lastName}</h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>{app.reason}</p>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'inline-block', background: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', border: '1px solid var(--border)' }}>
                      ⏱ {app.durationMins} min
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}
