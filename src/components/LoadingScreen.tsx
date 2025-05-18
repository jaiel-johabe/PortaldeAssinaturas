import { Building2 } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 flex flex-col items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl flex flex-col items-center">
        <Building2 className="text-white h-16 w-16 mb-4" />
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        <p className="text-white text-lg mt-4">Carregando...</p>
      </div>
    </div>
  );
}