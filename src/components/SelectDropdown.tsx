'use client';

import * as React from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SelectDropdownProps {
  name: string;
  options: Option[];
  defaultValue?: string;
  placeholder?: string;
}

export default function SelectDropdown({ name, options, defaultValue = '', placeholder = 'Seleccionar...' }: SelectDropdownProps) {
  const [selectedValue, setSelectedValue] = React.useState(defaultValue);
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

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <div style={{ position: 'relative', width: '100%' }} ref={popoverRef}>
      <input type="hidden" name={name} value={selectedValue} required />
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="input-field"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--surface)',
          color: selectedValue ? 'var(--text-main)' : 'var(--text-muted)',
          cursor: 'pointer',
          textAlign: 'left',
          width: '100%'
        }}
      >
        {selectedOption ? selectedOption.label : placeholder}
        <ChevronDown size={16} style={{ opacity: 0.5, transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '0.25rem',
          zIndex: 50,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(18, 53, 47, 0.1)',
          padding: '0.25rem',
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                setSelectedValue(option.value);
                setIsOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.5rem 0.75rem',
                cursor: 'pointer',
                borderRadius: '6px',
                fontSize: '0.9rem',
                background: selectedValue === option.value ? 'var(--surface-alt)' : 'transparent',
                color: 'var(--text-main)'
              }}
              onMouseOver={(e) => {
                if (selectedValue !== option.value) {
                  e.currentTarget.style.background = 'var(--surface-alt)';
                }
              }}
              onMouseOut={(e) => {
                if (selectedValue !== option.value) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {option.label}
              {selectedValue === option.value && (
                <Check size={16} style={{ color: 'var(--primary)' }} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
