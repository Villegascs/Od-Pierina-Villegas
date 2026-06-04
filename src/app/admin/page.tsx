import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getAdminAppointments, acceptAppointment, rejectAppointment, cancelAppointment, rescheduleAppointment } from "@/app/actions/appointment";
import DatePicker from "@/components/DatePicker";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const { pending, accepted, history } = await getAdminAppointments();

  return (
    <div className="grid-1-2">
        
        {/* Columna Izquierda: Pendientes e Historial */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <section className="glass-panel" style={{ padding: '1.5rem', background: 'var(--surface)' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary)' }}>Citas Pendientes ({pending.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pending.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No hay solicitudes nuevas.</p>}
              {pending.map((app: any) => (
                <div key={app.id} style={{ border: '1px solid var(--border)', padding: '1.5rem', borderRadius: '12px', background: 'var(--surface)' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary)', fontSize: '1.2rem' }}>{app.patient.firstName} {app.patient.lastName}</h3>
                  <p style={{ marginBottom: '1rem' }}><strong>Fecha sugerida:</strong> {app.requestedDate ? new Date(app.requestedDate).toLocaleDateString() : 'N/A'}</p>
                  
                  <details style={{ background: 'var(--surface-alt)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid var(--border)' }}>
                    <summary style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--primary)', outline: 'none' }}>Ver Detalles del Paciente</summary>
                    <div style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-main)', display: 'grid', gap: '0.5rem' }}>
                      <p><strong>Email:</strong> {app.patient.email}</p>
                      <p><strong>Sexo:</strong> {app.patient.gender === 'M' ? 'Masculino' : app.patient.gender === 'F' ? 'Femenino' : app.patient.gender || 'N/A'}</p>
                      <p><strong>Edad:</strong> {app.patient.dateOfBirth ? Math.floor((new Date().getTime() - new Date(app.patient.dateOfBirth).getTime()) / 31557600000) + ' años' : 'N/A'}</p>
                      <p><strong>Motivo:</strong> {app.reason}</p>
                    </div>
                  </details>
                  
                  <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                    <form action={async (formData) => {
                      'use server';
                      const date = formData.get('date') as string;
                      const time = formData.get('time') as string;
                      const duration = parseInt(formData.get('duration') as string);
                      await acceptAppointment(app.id, `${date}T${time}`, duration);
                    }} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                      <label style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 500 }}>Fecha de la cita:</label>
                      <DatePicker name="date" allowPastDates={false} />
                      
                      <label style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 500, marginTop: '0.5rem' }}>Hora de la cita:</label>
                      <input type="time" name="time" className="input-field" style={{ padding: '0.5rem' }} required />
                      
                      <label style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 500, marginTop: '0.5rem' }}>Duración (minutos):</label>
                      <input type="number" name="duration" defaultValue={30} className="input-field" style={{ padding: '0.5rem' }} required />
                      
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '0.5rem' }}>Aceptar y Agendar</button>
                        <button formAction={async () => {
                          'use server';
                          await rejectAppointment(app.id);
                        }} className="btn btn-outline" style={{ padding: '0.5rem' }}>Rechazar</button>
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
                  <span style={{ color: (app.status === 'REJECTED' || app.status === 'CANCELLED') ? 'var(--danger)' : 'var(--text-muted)' }}> 
                    {app.status === 'REJECTED' ? 'Rechazada' : app.status === 'CANCELLED' ? 'Cancelada' : 'Atendida'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Columna Derecha: Agenda */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section className="glass-panel" style={{ padding: '2rem', height: '100%' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--secondary)' }}>Agenda - Citas Aceptadas</h2>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              {accepted.length === 0 && <p style={{ color: 'var(--text-muted)' }}>La agenda está libre.</p>}
              {accepted.map((app: any) => (
                <div key={app.id} style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: '1rem',
                  padding: '1rem 1.5rem', 
                  borderRadius: '12px', 
                  background: 'var(--surface-alt)',
                  borderLeft: '6px solid var(--primary)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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

                  <details style={{ background: 'var(--surface)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <summary style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--primary)', outline: 'none', fontSize: '0.9rem' }}>Gestionar Cita</summary>
                    <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                      <form action={async (formData) => {
                        'use server';
                        const date = formData.get('date') as string;
                        const time = formData.get('time') as string;
                        const duration = parseInt(formData.get('duration') as string);
                        await rescheduleAppointment(app.id, `${date}T${time}`, duration);
                      }} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 500 }}>Reagendar Fecha:</label>
                        <DatePicker name="date" defaultValue={app.agendaDate ? new Date(app.agendaDate) : undefined} allowPastDates={true} />
                        
                        <label style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 500, marginTop: '0.5rem' }}>Reagendar Hora:</label>
                        <input type="time" name="time" defaultValue={app.agendaDate ? new Date(new Date(app.agendaDate).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(11, 16) : ''} className="input-field" style={{ padding: '0.5rem' }} required />
                        
                        <label style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 500, marginTop: '0.5rem' }}>Nueva Duración (minutos):</label>
                        <input type="number" name="duration" defaultValue={app.durationMins || 30} className="input-field" style={{ padding: '0.5rem' }} required />
                        
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                          <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.85rem' }}>Guardar Cambios</button>
                          <button formAction={async () => {
                            'use server';
                            await cancelAppointment(app.id);
                          }} className="btn btn-outline" style={{ padding: '0.5rem', fontSize: '0.85rem', color: 'var(--danger)', borderColor: 'var(--danger)' }}>Cancelar Cita</button>
                        </div>
                      </form>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </section>
        </div>

    </div>
  );
}
