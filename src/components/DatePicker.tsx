'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function DatePicker({ name, defaultValue, allowPastDates = false }: { name: string, defaultValue?: Date, allowPastDates?: boolean }) {
  const [date, setDate] = React.useState<Date | undefined>(defaultValue);
  const [isOpen, setIsOpen] = React.useState(false);
  const popoverRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [popoverRef]);

  return (
    <div className="date-picker-container" style={{ position: 'relative', width: '100%' }} ref={popoverRef}>
      <input type="hidden" name={name} value={date ? format(date, 'yyyy-MM-dd') : ''} />

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="input-field"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--surface)',
          color: date ? 'var(--text-main)' : 'var(--text-muted)',
          cursor: 'pointer',
          textAlign: 'left',
          width: '100%'
        }}
      >
        {date ? format(date, 'PPP', { locale: es }) : 'Selecciona una fecha'}
        <CalendarIcon size={18} style={{ color: 'var(--primary)', opacity: 0.8 }} />
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          marginTop: '0.5rem',
          zIndex: 50,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          boxShadow: '0 10px 30px -10px rgba(18, 53, 47, 0.2)',
          padding: '1rem',
        }}>
          <DayPicker
            mode="single"
            selected={date}
            onSelect={(d) => {
              setDate(d);
              setIsOpen(false);
            }}
            locale={es}
            disabled={allowPastDates ? undefined : (d) => d < new Date(new Date().setHours(0,0,0,0))}
            captionLayout="dropdown"
            startMonth={new Date(1950, 0)}
            endMonth={new Date(2050, 11)}
            className="shadcn-calendar"
          />
        </div>
      )}
    </div>
  );
}
