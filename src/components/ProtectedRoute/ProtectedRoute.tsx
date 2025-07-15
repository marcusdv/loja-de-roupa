'use client'
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Se não está carregando e não tem usuário, redireciona
    if (!loading && !user) {
      router.push(redirectTo);
    }
  }, [user, loading, router, redirectTo]);

  // Se está carregando, mostra loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl text-gray-600">Verificando autenticação...</div>
      </div>
    );
  }

  // Se não tem usuário, não renderiza nada (será redirecionado)
  if (!user) {
    return null;
  }

  // Se tem usuário, renderiza o conteúdo
  return <>{children}</>;
}
