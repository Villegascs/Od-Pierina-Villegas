import { getTransactions, createTransaction } from "@/app/actions/finance";
import DatePicker from "@/components/DatePicker";

export default async function FinancesPage() {
  const transactions = await getTransactions();
  
  const totalIncome = transactions.filter((t: any) => t.type === 'INCOME').reduce((acc: number, t: any) => acc + t.amount, 0);
  const totalExpense = transactions.filter((t: any) => t.type === 'EXPENSE').reduce((acc: number, t: any) => acc + t.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div>
      <h1 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '2rem' }}>Finanzas y Facturación</h1>
      
      <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
        <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Ingresos Totales</p>
          <h2 style={{ color: 'var(--success)', fontSize: '1.75rem', margin: 0 }}>${totalIncome.toFixed(2)}</h2>
        </div>
        <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Gastos Totales</p>
          <h2 style={{ color: 'var(--danger)', fontSize: '1.75rem', margin: 0 }}>${totalExpense.toFixed(2)}</h2>
        </div>
        <div style={{ background: 'var(--primary)', padding: '1.5rem', borderRadius: '12px', color: 'white', textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', opacity: 0.9 }}>Balance Neto</p>
          <h2 style={{ fontSize: '1.75rem', margin: 0 }}>${balance.toFixed(2)}</h2>
        </div>
      </div>

      <div className="grid-1-2">
        {/* Formulario */}
        <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>Registrar Movimiento</h2>
          <form action={async (formData) => {
            'use server';
            const type = formData.get('type') as 'INCOME' | 'EXPENSE';
            const amount = parseFloat(formData.get('amount') as string);
            const description = formData.get('description') as string;
            const date = formData.get('date') as string;
            await createTransaction(type, amount, description, date);
          }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="label">Tipo de Movimiento</label>
              <select name="type" className="input-field" required>
                <option value="INCOME">Ingreso (+)</option>
                <option value="EXPENSE">Gasto (-)</option>
              </select>
            </div>
            
            <div>
              <label className="label">Monto ($)</label>
              <input type="number" step="0.01" name="amount" className="input-field" placeholder="Ej: 50.00" required />
            </div>
            
            <div>
              <label className="label">Concepto / Descripción</label>
              <input type="text" name="description" className="input-field" placeholder="Ej: Limpieza dental, Compra de guantes..." required />
            </div>

            <div>
              <label className="label">Fecha</label>
              <DatePicker name="date" defaultValue={new Date()} allowPastDates={true} />
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Guardar Movimiento</button>
          </form>
        </div>

        {/* Historial */}
        <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>Historial Reciente</h2>
          
          {transactions.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No hay movimientos registrados.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '500px', overflowY: 'auto' }}>
              {transactions.map((t: any) => (
                <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.25rem' }}>{t.description}</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{new Date(t.date).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <strong style={{ color: t.type === 'INCOME' ? 'var(--success)' : 'var(--danger)', fontSize: '1.1rem' }}>
                      {t.type === 'INCOME' ? '+' : '-'}${t.amount.toFixed(2)}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
