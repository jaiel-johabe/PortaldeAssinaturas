import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, ArrowLeft, Check } from 'lucide-react';
import { SignatureFormData } from '../types';
import html2canvas from 'html2canvas';
import LogoutButton from '../components/LogoutButton';

export default function SignatureDownload() {
  const [signatureData, setSignatureData] = useState<SignatureFormData | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Recupera os dados da assinatura do sessionStorage
    const storedData = sessionStorage.getItem('signatureData');
    if (storedData) {
      setSignatureData(JSON.parse(storedData));
    } else {
      // Se não houver dados, redireciona para o portal
      navigate('/portal');
    }
  }, [navigate]);

  const handleDownload = async () => {
    if (!previewRef.current || !signatureData) return;
    
    try {
      setDownloading(true);
      
      const canvas = await html2canvas(previewRef.current, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#FFFFFF", // Set white background
        logging: false,
        onclone: (document) => {
          return document.fonts.ready.then(() => document);
        },
        imageTimeout: 0,
        pixelRatio: 1
      });
      
      const link = document.createElement('a');
      link.download = `assinatura-${signatureData.firstName.toLowerCase()}-${signatureData.lastName.toLowerCase()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
      
      setDownloading(false);
      setDownloadComplete(true);
      
      // Reset após 3 segundos
      setTimeout(() => {
        setDownloadComplete(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error generating signature:', error);
      alert('Erro ao gerar a assinatura. Por favor, tente novamente.');
      setDownloading(false);
    }
  };

  const handleBackToPortal = () => {
    navigate('/portal');
  };

  if (!signatureData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-white text-lg mt-4">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700">
      <header className="bg-green-950/70 shadow-xl border-b border-green-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="https://github.com/jaiel29/Images_public/blob/main/Example.png?raw=true" 
                alt="Example Group" 
                className="h-20 w-auto" 
              />
              <h1 className="text-2xl font-bold text-white">
                Download da Assinatura
              </h1>
            </div>
            <LogoutButton variant="danger" />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-green-800 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">
              Assinatura de {signatureData.firstName} {signatureData.lastName}
            </h2>
          </div>
          
          <div className="p-6">
            <div 
              ref={previewRef}
              className="mx-auto bg-white"
              style={{ 
                width: 600,
                padding: '12px',
                overflow: 'hidden'
              }}
            >
              {/* Conteúdo da assinatura para download - versão simplificada */}
              <div style={{ 
                fontFamily: '"Segoe UI", system-ui, sans-serif',
                display: 'flex',
                gap: '16px'
              }}>
                <div style={{ 
                  width: 140,
                  borderRight: '2px solid #00A88F',
                  paddingRight: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                   <img 
                     src={`https://github.com/jaiel29/Images_public/blob/main/Example.png?raw=true`}
                     alt="Company Logo" 
                     style={{
                       maxWidth: '140px',
                       maxHeight: '90px',
                       width: 'auto',
                       height: 'auto'
                     }}
                   />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontFamily: '"Avenir Next", "Segoe UI", sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#1a1a1a',
                    marginBottom: '2px',
                    lineHeight: 1.1
                  }}>{signatureData.firstName} {signatureData.lastName}</h3>
                  
                  <p style={{ 
                    fontFamily: '"Helvetica Neue", "Segoe UI", sans-serif',
                    fontSize: '12px',
                    color: '#333333',
                    fontWeight: 500,
                    marginBottom: '8px',
                    lineHeight: 1.2
                  }}>{signatureData.department}{signatureData.role ? ` - ${signatureData.role}` : ''}</p>
                  
                  <div style={{ 
                    fontFamily: '"Avenir Next", Arial, sans-serif',
                    fontSize: '12px',
                    color: '#4a4a4a',
                    lineHeight: '1.4'
                  }}>
                     {signatureData.phoneArea && signatureData.phoneNumber && (
                       <p>Tel: {signatureData.phoneCountry} ({signatureData.phoneArea}) {signatureData.phoneNumber}</p>
                     )}
                    {signatureData.ramal && <p>Ramal: {signatureData.ramal}</p>}
                    <p>{signatureData.emailUser}{signatureData.emailDomain}</p>
                    <p style={{ color: '#00A88F', fontWeight: 500 }}>www.examplegroup.com.br</p>
                  </div>
                  
                  <div style={{ 
                    borderTop: '1px solid #00A88F',
                    marginTop: '16px',
                    paddingTop: '12px'
                  }}>
                    <p style={{ 
                      fontFamily: '"Avenir Next", "Segoe UI", sans-serif',
                      fontWeight: 600,
                      color: '#333333',
                      marginBottom: '2px',
                      fontSize: '10px'
                    }}>AVISO DE CONFIDENCIALIDADE</p>
                    <p style={{ 
                      fontFamily: '"Avenir Next", "Segoe UI", sans-serif',
                      fontSize: '9px',
                      color: '#666666',
                      lineHeight: 1.2,
                      fontStyle: 'italic'
                    }}>Esta mensagem e seus anexos podem conter informações confidenciais e/ou privilegiadas. Se você recebeu esta mensagem por engano, por favor, avise imediatamente o remetente e exclua esta mensagem.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleBackToPortal}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                Voltar ao Portal
              </button>
              
              <button
                onClick={handleDownload}
                disabled={downloading}
                className={`px-6 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors flex items-center gap-2 ${
                  downloadComplete 
                    ? 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400' 
                    : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
                } ${downloading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {downloadComplete ? (
                  <>
                    <Check size={20} />
                    Download Concluído
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    {downloading ? 'Processando...' : 'Baixar Assinatura'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-green-950/70 text-green-200 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p>© {new Date().getFullYear()} Jaiel Johabe Macedo Barboza.</p>
        </div>
      </footer>
    </div>
  );
}
