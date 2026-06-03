'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Users, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    { href: '/admin', label: 'Agenda', icon: Calendar },
    { href: '/admin/patients', label: 'Pacientes', icon: Users },
    { href: '/admin/finances', label: 'Finanzas', icon: DollarSign },
  ];

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <nav className="admin-sidebar-nav">
      {links.map((link) => {
        const isActive = pathname === link.href;
        const Icon = link.icon;
        
        return (
          <Link 
            key={link.href} 
            href={link.href} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem',
              padding: '0.5rem 0.75rem', 
              borderRadius: '6px', 
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: isActive ? 'var(--primary)' : 'var(--text-muted)',
              background: isActive ? 'rgba(18, 53, 47, 0.08)' : 'transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
