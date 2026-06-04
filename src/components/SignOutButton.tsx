'use client';
import { signOut } from 'next-auth/react';

import React from 'react';

interface SignOutButtonProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function SignOutButton({ className = "btn btn-outline", children = "Cerrar Sesión", style }: SignOutButtonProps) {
  return (
    <button 
      onClick={() => {
        if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
          signOut({ callbackUrl: '/' });
        }
      }} 
      className={className}
      style={style}
    >
      {children}
    </button>
  );
}
