import { Suspense, lazy, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignatureFormData } from '../types';
import { X, Download } from 'lucide-react';

const SignaturePreview = lazy(() => import('./SignaturePreview').then(module => ({
  default: module.SignaturePreview
})));

interface SignatureModalProps {
  data: SignatureFormData;
  onClose: () => void;
}

export default function SignatureModal({ data, onClose }: SignatureModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const fireworksRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleDownloadClick = () => {
    // Armazena os dados da assinatura no sessionStorage para página de download
    sessionStorage.setItem('signatureData', JSON.stringify(data));
    navigate('/download');
  };

  // Efeito para criar fogos de artifício quando o modal é aberto PERFUMARIA
  useEffect(() => {
    if (!fireworksRef.current) return;
    
    const container = fireworksRef.current;
    const colors = ['#00A88F', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
    
    // Função para criar uma partícula
    const createParticle = (delay: number, size: number, distance: number, duration: number, color: string) => {
      setTimeout(() => {
        const particle = document.createElement('div');
        
        // Posição inicial no centro
        const startX = container.clientWidth / 2;
        const startY = container.clientHeight / 2;
        
        // Ângulo aleatório
        const angle = Math.random() * Math.PI * 2;
        
        // Posição final
        const endX = startX + Math.cos(angle) * distance;
        const endY = startY + Math.sin(angle) * distance;
        
        // Configurar a partícula
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.opacity = '0';
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        particle.style.zIndex = '100';
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        
        // Adicionar ao container
        container.appendChild(particle);
        
        // Animar
        setTimeout(() => {
          particle.style.transition = `all ${duration}s cubic-bezier(0.165, 0.84, 0.44, 1)`;
          particle.style.left = `${endX}px`;
          particle.style.top = `${endY}px`;
          particle.style.opacity = '1';
          
          // Desaparecer
          setTimeout(() => {
            particle.style.opacity = '0';
            setTimeout(() => {
              if (container.contains(particle)) {
                container.removeChild(particle);
              }
            }, duration * 1000);
          }, duration * 500);
        }, 10);
      }, delay);
    };
    
    // Criar várias explosões de fogos
    const createFirework = (x: number, y: number, particleCount: number, baseDelay: number) => {
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 8 + 4;
        const distance = Math.random() * 150 + 50;
        const duration = Math.random() * 0.8 + 0.6;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const delay = baseDelay + i * 20;
        
        createParticle(delay, size, distance, duration, color);
      }
    };
    
    // Criar múltiplas explosões em posições diferentes
    createFirework(container.clientWidth / 2, container.clientHeight / 3, 25, 0);
    createFirework(container.clientWidth / 3, container.clientHeight / 2, 20, 300);
    createFirework(container.clientWidth * 2/3, container.clientHeight / 2, 20, 600);
    createFirework(container.clientWidth / 2, container.clientHeight * 2/3, 25, 900);
    
    // Criar algumas partículas que sobem e explodem
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const rocketDiv = document.createElement('div');
        const startX = Math.random() * container.clientWidth;
        const startY = container.clientHeight;
        const endX = startX + (Math.random() * 100 - 50);
        const endY = Math.random() * (container.clientHeight / 2) + 50;
        
        rocketDiv.style.position = 'absolute';
        rocketDiv.style.width = '4px';
        rocketDiv.style.height = '4px';
        rocketDiv.style.backgroundColor = '#FFF';
        rocketDiv.style.borderRadius = '50%';
        rocketDiv.style.left = `${startX}px`;
        rocketDiv.style.top = `${startY}px`;
        rocketDiv.style.zIndex = '99';
        rocketDiv.style.boxShadow = '0 0 6px #FFF, 0 0 12px #FF0';
        
        container.appendChild(rocketDiv);
        
        // Animar o foguete subindo
        setTimeout(() => {
          rocketDiv.style.transition = 'all 0.8s ease-out';
          rocketDiv.style.left = `${endX}px`;
          rocketDiv.style.top = `${endY}px`;
          
          // Quando chegar ao topo, remover o foguete e criar explosão
          setTimeout(() => {
            if (container.contains(rocketDiv)) {
              container.removeChild(rocketDiv);
              createFirework(endX, endY, 30, 0);
            }
          }, 800);
        }, 10);
      }, i * 500 + 1200);
    }
    
  }, []);
			// FIM DA PERFUMARIA
  return (
    <div 
      id="signature-preview-modal"
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="bg-green-800 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 8v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"></path>
              <path d="M21 8H3"></path>
            </svg>
            Prévia da Assinatura
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-green-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)] relative">
          {/* Container para os fogos de artifício */}
          <div ref={fireworksRef} className="absolute inset-0 overflow-hidden pointer-events-none"></div>
          
          <Suspense fallback={
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-900"></div>
            </div>
          }>
            <SignaturePreview data={data} />
          </Suspense>
          
          {/* OBDJETO REMOVIDO */}
        </div>
      </div>
    </div>
  );
}
