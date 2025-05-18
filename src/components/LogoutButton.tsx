import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
}

export default function LogoutButton({ variant = 'primary', className = '' }: LogoutButtonProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const handleCancelLogout = () => {
    setShowConfirmation(false);
  };

  const handleConfirmLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const getButtonClasses = () => {
    const baseClasses = "flex items-center gap-2 px-3 py-2 rounded-md transition-colors";
    
    switch (variant) {
      case 'primary':
        return `${baseClasses} bg-green-600 text-white hover:bg-green-700 ${className}`;
      case 'secondary':
        return `${baseClasses} bg-transparent text-white border border-white/30 hover:bg-white/10 ${className}`;
      case 'danger':
        return `${baseClasses} bg-red-600 text-white hover:bg-red-700 ${className}`;
      default:
        return `${baseClasses} bg-green-600 text-white hover:bg-green-700 ${className}`;
    }
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className={getButtonClasses()}
      >
        <LogOut size={18} />
        <span>Sair</span>
      </button>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Confirmar saída</h3>
            <p className="text-gray-700 mb-6">
              Tem certeza que deseja finalizar sua sessão? Você precisará fazer login novamente para acessar o portal.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelLogout}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
              >
                Não
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                Finalizar sessão
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
