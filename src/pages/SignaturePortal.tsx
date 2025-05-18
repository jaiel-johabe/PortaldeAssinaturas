import { useState } from "react";
import { SignatureForm } from "../components/SignatureForm";
import { SignatureFormData } from "../types";
import { Building2, Mail, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import LogoutButton from "../components/LogoutButton";
import SignatureModal from "../components/SignatureModal";

export default function SignaturePortal() {
  const [signatureData, setSignatureData] = useState<SignatureFormData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useAuth();

  const handleFormSubmit = (data: SignatureFormData) => {
    setSignatureData(data);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700">
      <header className="bg-green-950/70 shadow-xl border-b border-green-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="https://github.com/jaiel29/Images_public/blob/main/Example.png?raw=true" 
                alt="Example Group" 
                className="h-20 w-auto" 
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Portal de Assinaturas
                </h1>
                <p className="text-green-300 text-sm md:text-base">
                  Gerador de assinaturas Example Group
                </p>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center justify-between md:justify-end w-full md:w-auto gap-4">
              <div className="flex items-center space-x-2 text-green-200 text-sm">
                <User size={18} />
                <span>{currentUser?.email}</span>
              </div>
              
              <LogoutButton variant="secondary" className="text-sm" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-lg overflow-hidden">
          <div className="bg-green-800 px-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"></path>
                <path d="M8 12h8"></path>
                <path d="M12 8v8"></path>
              </svg>
              Criar Nova Assinatura
            </h2>
          </div>
          <div className="p-6">
            <SignatureForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      </main>
      
      <footer className="bg-green-950/70 text-green-200 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p>© {new Date().getFullYear()} Jaiel Johabe Macedo Barboza.</p>
        </div>
      </footer>

      {showModal && signatureData && (
        <SignatureModal 
          data={signatureData} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}
