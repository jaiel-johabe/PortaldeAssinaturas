import React, { useRef, useEffect, useState } from 'react';
import { SignatureFormData, COMPANY_LOGOS, formatPhoneNumber, CONFIDENTIALITY_NOTICE } from '../types';
import html2canvas from 'html2canvas';

interface SignaturePreviewProps {
  data: SignatureFormData;
}

const CONTACT_LABELS = {
  pt: {
    phone: 'Tel',
    extension: 'Ramal',
    developedBy: 'Desenvolvido por',
    version: 'Versão'
  },
  en_uk: {
    phone: 'Phone',
    extension: 'Ext',
    developedBy: 'Developed by',
    version: 'Version'
  },
  en_us: {
    phone: 'Phone',
    extension: 'Ext',
    developedBy: 'Developed by',
    version: 'Version'
  },
  de: {
    phone: 'Tel',
    extension: 'Durchwahl',
    developedBy: 'Entwickelt von',
    version: 'Version'
  },
  fr: {
    phone: 'Tél',
    extension: 'Poste',
    developedBy: 'Développé par',
    version: 'Version'
  },
  it: {
    phone: 'Tel',
    extension: 'Int',
    developedBy: 'Sviluppato da',
    version: 'Versione'
  },
  rm: {
    phone: 'Tel',
    extension: 'Ext',
    developedBy: 'Sviluppà da',
    version: 'Versiun'
  },
  da: {
    phone: 'Tlf',
    extension: 'Lok',
    developedBy: 'Udviklet af',
    version: 'Version'
  },
  ja: {
    phone: '電話',
    extension: '内線',
    developedBy: '開発者',
    version: 'バージョン'
  },
  hi: {
    phone: 'फ़ोन',
    extension: 'एक्स्ट',
    developedBy: 'द्वारा विकसित',
    version: 'संस्करण'
  }
} as const;

const APP_VERSION = 'Oficial';

// Dimensões otimizadas para o Outlook - formato mais retangular
const SIGNATURE_DIMENSIONS = {
  width: 570,
  minHeight: 190,
  logoWidth: 133,
  logoHeight: 86 
};

const LOWERCASE_WORDS_BY_LANGUAGE = {
  pt: ['da', 'de', 'do', 'das', 'dos', 'e', 'em', 'para', 'por'],
  en_uk: ['and', 'at', 'by', 'for', 'in', 'of', 'on', 'the', 'to', 'with'],
  en_us: ['and', 'at', 'by', 'for', 'in', 'of', 'on', 'the', 'to', 'with'],
  de: ['und', 'an', 'auf', 'bei', 'für', 'in', 'mit', 'nach', 'von', 'zu'],
  fr: ['à', 'au', 'aux', 'de', 'des', 'du', 'et', 'en', 'la', 'le', 'les', 'par', 'pour', 'sur'],
  it: ['a', 'al', 'alla', 'con', 'da', 'dal', 'della', 'di', 'e', 'ed', 'il', 'in', 'la', 'per', 'su'],
  rm: ['e', 'ed', 'en', 'il', 'la', 'las', 'ils', 'las', 'dals', 'da', 'per'],
  da: ['af', 'og', 'i', 'på', 'til', 'for', 'med', 'ved', 'fra'],
  ja: ['の', 'に', 'を', 'は', 'が', 'で', 'と', 'へ', 'から', 'まで'],
  hi: ['का', 'की', 'के', 'में', 'से', 'और', 'पर', 'को', 'ने']
};

function capitalizeWords(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function capitalizeDepartment(department: string, language: keyof typeof CONTACT_LABELS): string {
  if (language === 'ja' || language === 'hi') {
    return department;
  }

  const lowercaseWords = LOWERCASE_WORDS_BY_LANGUAGE[language] || [];
  
  if (department.toLowerCase().startsWith('sso ')) {
    return 'SSO' + department.slice(3);
  } else if (department.toLowerCase().startsWith('hse ')) {
    return 'HSE' + department.slice(3);
  } else if (department.toLowerCase().startsWith('ssl ')) {
    return 'SSL' + department.slice(3);
  } else if (department.toLowerCase().startsWith('sst ')) {
    return 'SST' + department.slice(3);
  } else if (department.toLowerCase().startsWith('ssp ')) {
    return 'SSP' + department.slice(3);
  } else if (department.toLowerCase().startsWith('ams ')) {
    return 'AMS' + department.slice(3);
  } else if (department.toLowerCase().startsWith('asu ')) {
    return 'ASU' + department.slice(3);
  }
  
  return department
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (lowercaseWords.includes(word.toLowerCase()) && index !== 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

function capitalizeRole(role: string, language: keyof typeof CONTACT_LABELS): string {
  if (!role) return '';
  if (language === 'ja' || language === 'hi') {
    return role;
  }
  
  const executiveRoles = ['CEO', 'CTO', 'CFO', 'CIO', 'COO', 'CMO', 'CHRO', 'CSO', 'CPO', 'CLO', 'CCO', 'CISO', 'CDO', 'CAO', 'CRO', 'CBO', 'CDEO'];
  
  if (executiveRoles.includes(role.toUpperCase())) {
    return role.toUpperCase();
  }
  
  const lowercaseWords = LOWERCASE_WORDS_BY_LANGUAGE[language] || [];
  
  return role
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (lowercaseWords.includes(word.toLowerCase()) && index !== 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

export function SignaturePreview({ data }: SignaturePreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [contentHeight, setContentHeight] = useState(SIGNATURE_DIMENSIONS.minHeight);

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [data.company]);

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setContentHeight(Math.max(height + 19, SIGNATURE_DIMENSIONS.minHeight));
    }
  }, [data, imageLoaded]);

  const openSignatureInNewTab = async () => {
    if (!previewRef.current) return;

    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#FFFFFF",
        logging: false,
        width: SIGNATURE_DIMENSIONS.width,
        height: contentHeight,
        onclone: (document) => {
          return document.fonts.ready.then(() => document);
        },
        imageTimeout: 0,
        pixelRatio: 1
      });
      
      const imgData = canvas.toDataURL('image/png', 1.0);
      const newTab = window.open();
      if (!newTab) {
        alert('Por favor, permita que este site abra novas janelas para visualizar a assinatura.');
        return;
      }
      
      const fileName = `assinatura-${data.firstName.toLowerCase()}-${data.lastName.toLowerCase()}.png`;
      
      newTab.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Assinatura - ${data.firstName} ${data.lastName}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Segoe UI', Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background-color: #f5f5f5;
              display: flex;
              flex-direction: column;
              align-items: center;
              min-height: 100vh;
            }
            .container {
              max-width: 800px;
              width: 100%;
              text-align: center;
            }
            h1 {
              color: #00A88F;
              margin-bottom: 20px;
            }
            .signature-container {
              background-color: white;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              margin-bottom: 20px;
              display: inline-block;
            }
            .signature-img {
              max-width: 100%;
              height: auto;
            }
            .download-btn {
              background-color: #00A88F;
              color: white;
              border: none;
              padding: 12px 24px;
              font-size: 16px;
              border-radius: 4px;
              cursor: pointer;
              transition: background-color 0.3s;
              margin-top: 20px;
            }
            .download-btn:hover {
              background-color: #008c76;
            }
            @media (max-width: 600px) {
              .container {
                padding: 10px;
              }
              h1 {
                font-size: 24px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Assinatura de ${data.firstName} ${data.lastName}</h1>
            <div class="signature-container">
              <img src="${imgData}" alt="Assinatura" class="signature-img">
            </div>
            <button class="download-btn" id="downloadBtn">Baixar Assinatura</button>
          </div>
          <script>
            document.getElementById('downloadBtn').addEventListener('click', function() {
              const link = document.createElement('a');
              link.download = '${fileName}';
              link.href = '${imgData}';
              link.click();
            });
          </script>
        </body>
        </html>
      `);
      newTab.document.close();
    } catch (error) {
      console.error('Error generating signature:', error);
      alert('Erro ao gerar a assinatura. Por favor, tente novamente.');
    }
  };

  const formatPhone = () => {
    if (!data.phoneArea || !data.phoneNumber) return null;
    const formattedNumber = formatPhoneNumber(data.phoneCountry, data.phoneNumber);
    return `${data.phoneCountry} (${data.phoneArea}) ${formattedNumber}`;
  };

  const fullEmail = `${data.emailUser.toLowerCase()}${data.emailDomain.toLowerCase()}`;
  const labels = CONTACT_LABELS[data.language];

  const showConfidentialityNotices = () => {
    if (!data.defaultBilingual) {
      return [{ title: CONFIDENTIALITY_NOTICE[data.language].title, text: CONFIDENTIALITY_NOTICE[data.language].text }];
    }

    if (data.language === 'en_uk' || data.language === 'en_us') {
      return [{ title: CONFIDENTIALITY_NOTICE[data.language].title, text: CONFIDENTIALITY_NOTICE[data.language].text }];
    }

    return [
      { title: CONFIDENTIALITY_NOTICE[data.language].title, text: CONFIDENTIALITY_NOTICE[data.language].text },
      { title: CONFIDENTIALITY_NOTICE.en_us.title, text: CONFIDENTIALITY_NOTICE.en_us.text }
    ];
  };

  const contactInfoStyle = {
    fontFamily: '"Avenir Next", Arial, sans-serif',
    fontSize: '11px',
    color: '#4a4a4a',
    letterSpacing: '0.2px',
    lineHeight: '1.4',
    textShadow: 'none',
    margin: '0 0 2px 0'
  };

  const getLogoStyle = () => ({
    maxWidth: data.company === 'Example GROUP' || data.company === 'OFICIAL' ? '152px' : '133px',
    maxHeight: data.company === 'Example GROUP' || data.company === 'OFICIAL' ? '95px' : '86px',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain' as const,
    objectPosition: 'center',
    filter: 'none',
    display: imageLoaded ? 'block' : 'none'
  });

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Error loading image:', e.currentTarget.src);
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <div className="space-y-4">
      <div
        ref={previewRef}
        className="mx-auto bg-white"
        style={{ 
          width: SIGNATURE_DIMENSIONS.width,
          height: contentHeight,
          padding: '0',
          overflow: 'hidden'
        }}
      >
        <div 
          ref={contentRef}
          style={{ 
            fontFamily: '"Segoe UI", system-ui, sans-serif',
            position: 'relative',
            height: '100%',
            padding: '11px'
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '8px 8px 0 0',
            borderColor: '#00A88F transparent transparent transparent',
            zIndex: 1
          }}></div>

          <div style={{ 
            display: 'flex', 
            position: 'relative', 
            height: '100%',
            gap: '15px'
          }}>
            <div style={{ 
              width: SIGNATURE_DIMENSIONS.logoWidth,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              borderRight: '2px solid #00A88F',
              paddingRight: '15px',
              paddingTop: '0',
              paddingBottom: '0'
            }}>
              <div style={{
                width: '100%',
                height: SIGNATURE_DIMENSIONS.logoHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px'
              }}>
                {!imageLoaded && !imageError && (
                  <div className="animate-pulse bg-gray-200 rounded-lg" style={{ width: '133px', height: '86px' }} />
                )}
                {imageError && (
                  <div className="flex items-center justify-center bg-red-50 rounded-lg" style={{ width: '133px', height: '86px' }}>
                    <p className="text-red-500 text-sm">Erro ao carregar logo</p>
                  </div>
                )}
                <img
                  src={COMPANY_LOGOS[data.company as keyof typeof COMPANY_LOGOS]}
                  alt={data.company}
                  style={getLogoStyle()}
                  crossOrigin="anonymous"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              </div>
            </div>

            <div style={{ 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              paddingTop: '4px'
            }}>
              <div>
                <h2 style={{ 
                  fontFamily: '"Avenir Next", "Segoe UI", sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  marginBottom: '2px',
                  letterSpacing: '0.2px',
                  lineHeight: 1.1
                }}>
                  {capitalizeWords(data.firstName)} {capitalizeWords(data.lastName)}
                </h2>
                <p style={{ 
                  fontFamily: '"Helvetica Neue", "Segoe UI", sans-serif',
                  fontSize: '11px',
                  color: '#333333',
                  fontWeight: 500,
                  letterSpacing: '0.2px',
                  marginBottom: '8px',
                  lineHeight: 1.2
                }}>
                  {capitalizeDepartment(data.department, data.language)}{data.role ? ` - ${capitalizeRole(data.role, data.language)}` : ''}
                </p>
                <div style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px'
                }}>
                  {formatPhone() && (
                    <p style={contactInfoStyle}>
                      {data.defaultBilingual ? 'Tel' : labels.phone}: {formatPhone()}
                    </p>
                  )}
                  {data.ramal && (
                    <p style={contactInfoStyle}>
                      {data.defaultBilingual ? 'Ramal' : labels.extension}: {data.ramal}
                    </p>
                  )}
                  <p style={contactInfoStyle}>{fullEmail}</p>
                  <p style={{ 
                    ...contactInfoStyle,
                    color: '#00A88F',
                    fontWeight: 500
                  }}>www.example.com.br</p>
                </div>
              </div>

              <div style={{ 
                borderTop: '1px solid #00A88F',
                marginTop: '11px',
                paddingTop: '8px'
              }}>
                <div style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  {showConfidentialityNotices().map((notice, index) => (
                    <div key={index}>
                      <p style={{ 
                        fontFamily: '"Avenir Next", "Segoe UI", sans-serif',
                        fontWeight: 600,
                        color: '#333333',
                        marginBottom: '1px',
                        fontSize: '9px'
                      }}>
                        {notice.title}
                      </p>
                      <p style={{ 
                        fontFamily: '"Avenir Next", "Segoe UI", sans-serif',
                        fontSize: '8px',
                        color: '#666666',
                        lineHeight: 1.2,
                        fontStyle: 'italic',
                        margin: 0
                      }}>
                        {notice.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <button
          onClick={openSignatureInNewTab}
          className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v12"></path>
            <path d="m8 11 4 4 4-4"></path>
            <path d="M8 21H16"></path>
            <path d="M12 17v4"></path>
          </svg>
          {data.language === 'pt' ? 'Visualizar e Baixar Assinatura' : 'View and Download Signature'}
        </button>

        <div className="text-center text-sm text-gray-600 mt-4">
          <p>
            {data.defaultBilingual ? 'Desenvolvido por' : labels.developedBy}:{' '}
            <span className="font-semibold">Jaiel Johabe Macedo Barboza</span>
            {' • '}
            <span className="text-green-600">
              {labels.version}: {APP_VERSION}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
