'use client'
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';

export default function Perfil() {
  const { user, signOut } = useAuth();

  // Função para extrair nome do usuário
  const getUserDisplayName = () => {
    if (!user) return 'Usuário';
    
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    
    if (user.email) {
      return user.email.split('@')[0];
    }
    
    return 'Usuário';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 py-8 mt-20">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Header do perfil */}
          <div className="border-b pb-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Meu Perfil
            </h1>
            <p className="text-gray-600">
              Gerencie suas informações pessoais e preferências
            </p>
          </div>

          {/* Informações do usuário */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Informações Pessoais
              </h2>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome de exibição
                  </label>
                  <p className="text-lg text-gray-900 bg-gray-50 p-3 rounded">
                    {getUserDisplayName()}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="text-lg text-gray-900 bg-gray-50 p-3 rounded">
                    {user?.email}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Membro desde
                  </label>
                  <p className="text-lg text-gray-900 bg-gray-50 p-3 rounded">
                    {user?.created_at ? formatDate(user.created_at) : 'N/A'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Último login
                  </label>
                  <p className="text-lg text-gray-900 bg-gray-50 p-3 rounded">
                    {user?.last_sign_in_at ? formatDate(user.last_sign_in_at) : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Ações do usuário */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Ações da Conta
              </h2>
              
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors">
                  Editar Perfil
                </button>
                
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors">
                  Alterar Senha
                </button>
                
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors">
                  Ver Meus Pedidos
                </button>
                
                <button 
                  onClick={() => signOut()}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  Sair da Conta
                </button>
              </div>
            </div>
          </div>

          {/* Informações adicionais do Supabase */}
          {user?.user_metadata && Object.keys(user.user_metadata).length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Informações Adicionais
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-700 overflow-auto">
                  {JSON.stringify(user.user_metadata, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
