import { getPatients } from "@/app/actions/patients";

export default async function PatientsPage() {
  const patients = await getPatients();

  return (
    <div>
      <h1 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '2rem' }}>Directorio de Pacientes</h1>
      
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {patients.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No hay pacientes registrados.</p>}
        {patients.map((patient: any) => (
          <details key={patient.id} style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <summary style={{ cursor: 'pointer', outline: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--primary)' }}>{patient.firstName} {patient.lastName}</h2>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{patient.email}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.85rem', background: 'var(--surface-alt)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                  {patient.appointments.length} Citas
                </span>
              </div>
            </summary>
            
            <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '1rem' }}>Datos Personales</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}><strong>Sexo:</strong> {patient.gender === 'M' ? 'Masculino' : patient.gender === 'F' ? 'Femenino' : patient.gender || 'N/A'}</p>
                <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}><strong>Edad:</strong> {patient.dateOfBirth ? Math.floor((new Date().getTime() - new Date(patient.dateOfBirth).getTime()) / 31557600000) + ' años' : 'N/A'}</p>
                <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}><strong>Registrado:</strong> {new Date(patient.createdAt).toLocaleDateString()}</p>
              </div>
              
              <div>
                <h3 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '1rem' }}>Historial de Citas</h3>
                {patient.appointments.length === 0 ? (
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Sin historial.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
                    {patient.appointments.map((app: any) => (
                      <div key={app.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: 'var(--surface-alt)', borderRadius: '6px', fontSize: '0.85rem' }}>
                        <div>
                          <strong>{app.requestedDate ? new Date(app.requestedDate).toLocaleDateString() : 'N/A'}</strong> - {app.reason}
                        </div>
                        <div>
                          <span style={{ 
                            color: app.status === 'PENDING' ? 'var(--warning)' : app.status === 'ACCEPTED' ? 'var(--success)' : 'var(--danger)',
                            fontWeight: 600
                          }}>
                            {app.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
