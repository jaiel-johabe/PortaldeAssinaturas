export interface SignatureFormData {
  firstName: string;
  lastName: string;
  emailUser: string;
  emailDomain: string;
  phoneCountry: string;
  phoneArea: string;
  phoneNumber: string;
  ramal?: string;
  department: string;
  role?: string;
  company: string;
  language: Language;
  defaultBilingual: boolean;
}

export type Language = 
  | 'pt' 
  | 'en_uk'
  | 'en_us'
  | 'de' 
  | 'fr' 
  | 'it' 
  | 'rm' 
  | 'da' 
  | 'ja' 
  | 'hi';

export const LANGUAGES = {
  pt: 'Português',
  en_uk: 'English (UK)',
  en_us: 'English (US)',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
  rm: 'Rumantsch',
  da: 'Dansk',
  ja: '日本語',
  hi: 'हिन्दी'
} as const;

export const ROLES_BY_LANGUAGE = {
  pt: [
    'ESPECIALISTA',
    'LÍDER',
    'COORDENAÇÃO',
    'GERÊNCIA',
    'CEO',
    'CTO',
    'CFO',
    'CIO',
    'COO',
    'CMO',
    'CHRO',
    'CSO',
    'CPO',
    'CLO',
    'CCO',
    'CISO',
    'CDO',
    'CAO',
    'CRO',
    'CBO',
    'CDEO'
  ],
  en_uk: [
    'SPECIALIST',
    'LEADER',
    'COORDINATION',
    'MANAGEMENT',
    'CEO',
    'CTO',
    'CFO',
    'CIO',
    'COO',
    'CMO',
    'CHRO',
    'CSO',
    'CPO',
    'CLO',
    'CCO',
    'CISO',
    'CDO',
    'CAO',
    'CRO',
    'CBO',
    'CDEO'
  ],
  en_us: [
    'SPECIALIST',
    'LEADER',
    'COORDINATION',
    'MANAGEMENT',
    'CEO',
    'CTO',
    'CFO',
    'CIO',
    'COO',
    'CMO',
    'CHRO',
    'CSO',
    'CPO',
    'CLO',
    'CCO',
    'CISO',
    'CDO',
    'CAO',
    'CRO',
    'CBO',
    'CDEO'
  ],
  de: [
    'SPEZIALIST',
    'LEITER',
    'KOORDINIERUNG',
    'MANAGEMENT',
    'CEO',
    'CTO',
    'CFO',
    'CIO',
    'COO',
    'CMO',
    'CHRO',
    'CSO',
    'CPO',
    'CLO',
    'CCO',
    'CISO',
    'CDO',
    'CAO',
    'CRO',
    'CBO',
    'CDEO'
  ],
  fr: [
    'SPÉCIALISTE',
    'CHEF',
    'COORDINATEUR',
    'GESTION',
    'CEO',
    'CTO',
    'CFO',
    'CIO',
    'COO',
    'CMO',
    'CHRO',
    'CSO',
    'CPO',
    'CLO',
    'CCO',
    'CISO',
    'CDO',
    'CAO',
    'CRO',
    'CBO',
    'CDEO'
  ],
  it: [
    'SPECIALISTA',
    'LEADER',
    'COORDINAMENTO',
    'GESTIONE',
    'CEO',
    'CTO',
    'CFO',
    'CIO',
    'COO',
    'CMO',
    'CHRO',
    'CSO',
    'CPO',
    'CLO',
    'CCO',
    'CISO',
    'CDO',
    'CAO',
    'CRO',
    'CBO',
    'CDEO'
  ],
  rm: [
    'SPEZIALIST',
    'MANADER',
    'COORDINATUR',
    'MANADER',
    'CEO',
    'CTO',
    'CFO',
    'CIO',
    'COO',
    'CMO',
    'CHRO',
    'CSO',
    'CPO',
    'CLO',
    'CCO',
    'CISO',
    'CDO',
    'CAO',
    'CRO',
    'CBO',
    'CDEO'
  ],
  da: [
    'SPECIALIST',
    'LEDER',
    'KOORDINATOR',
    'CHEF',
    'CEO',
    'CTO',
    'CFO',
    'CIO',
    'COO',
    'CMO',
    'CHRO',
    'CSO',
    'CPO',
    'CLO',
    'CCO',
    'CISO',
    'CDO',
    'CAO',
    'CRO',
    'CBO',
    'CDEO'
  ],
  ja: [
    '専門家',
    'リーダー',
    'コーディネーター',
    'マネージャー',
    'CEO',
    'CTO',
    'CFO',
    'CIO',
    'COO',
    'CMO',
    'CHRO',
    'CSO',
    'CPO',
    'CLO',
    'CCO',
    'CISO',
    'CDO',
    'CAO',
    'CRO',
    'CBO',
    'CDEO'
  ],
  hi: [
    'विशेषज्ञ',
    'नेता',
    'समन्वयक',
    'प्रबंधक',
    'CEO',
    'CTO',
    'CFO',
    'CIO',
    'COO',
    'CMO',
    'CHRO',
    'CSO',
    'CPO',
    'CLO',
    'CCO',
    'CISO',
    'CDO',
    'CAO',
    'CRO',
    'CBO',
    'CDEO'
  ]
} as const;

export const DEPARTMENTS = {
  pt: [
    'Administrativo',
    'Comercial',
    'Comex',
    'Compras',
    'Courier',
    'Customer Service',
    'Diretoria',
    'Financeiro',
    'Fiscal',
    'Garantia da Qualidade',
    'Imports',
    'Jurídico',
    'Marketing',
    'Pricing',
    'Projetos',
    'Gente e Gestão',
    'Serviços Logísticos',
    'SSO - Saúde e Segurança Ocupacional',
    'Tecnologia da Informação',
    'Warehouse'
  ],
  en_uk: [
    'Administrative',
    'Commercial',
    'Foreign Trade',
    'Purchasing',
    'Courier',
    'Customer Service',
    'Executive Board',
    'Financial',
    'Tax',
    'Quality Assurance',
    'Imports',
    'Legal',
    'Marketing',
    'Pricing',
    'Projects',
    'People and Management',
    'Logistics Services',
    'HSE - Health and Safety at Work',
    'Information Technology',
    'Warehouse'
  ],
  en_us: [
    'Administrative',
    'Commercial',
    'Foreign Trade',
    'Purchasing',
    'Courier',
    'Customer Service',
    'Executive Board',
    'Financial',
    'Tax',
    'Quality Assurance',
    'Imports',
    'Legal',
    'Marketing',
    'Pricing',
    'Projects',
    'People and Management',
    'Logistics Services',
    'HSE - Health and Safety at Work',
    'Information Technology',
    'Warehouse'
  ],
  de: [
    'Verwaltung',
    'Handel',
    'Aussenhandel',
    'Einkauf',
    'Kurierdienst',
    'Kundendienst',
    'Vorstand',
    'Finanzen',
    'Steuern',
    'Qualitätssicherung',
    'Importe',
    'Recht',
    'Marketing',
    'Preisgestaltung',
    'Projekte',
    'Mitarbeiter und Management',
    'Logistikdienste',
    'ASU - Arbeitsschutz und Sicherheit',
    'Informationstechnologie',
    'Lager'
  ],
  fr: [
    'Administration',
    'Commercial',
    'Commerce Extérieur',
    'Achats',
    'Courrier',
    'Service Client',
    'Conseil Exécutif',
    'Finances',
    'Fiscal',
    'Assurance Qualité',
    'Importations',
    'Juridique',
    'Marketing',
    'Tarification',
    'Projets',
    'Personnes et Gestion',
    'Services Logistiques',
    'SST - Santé et Sécurité au Travail',
    'Technologie de l\'Information',
    'Entrepôt'
  ],
  it: [
    'Amministrazione',
    'Commerciale',
    'Commercio Estero',
    'Acquisti',
    'Corriere',
    'Servizio Clienti',
    'Consiglio Esecutivo',
    'Finanza',
    'Fiscale',
    'Garanzia Qualità',
    'Importazioni',
    'Legale',
    'Marketing',
    'Prezzi',
    'Progetti',
    'Persone e Gestione',
    'Servizi Logistici',
    'SSL - Salute e Sicurezza sul Lavoro',
    'Tecnologia dell\'Informazione',
    'Magazzino'
  ],
  rm: [
    'Administraziun',
    'Commerzi',
    'Commerzi Extern',
    'Acquisiziun',
    'Currier',
    'Servetsch da Clients',
    'Direcziun',
    'Finanzas',
    'Fiscal',
    'Garanzia da Qualitad',
    'Imports',
    'Giuridic',
    'Marketing',
    'Pretschs',
    'Projects',
    'Resursas Umanas',
    'Servetschs Logistics',
    'SSP - Sanadad e Segirezza Professiunala',
    'Tecnologia d\'Infurmaziun',
    'Deposit'
  ],
  da: [
    'Administration',
    'Kommerciel',
    'Udenrigshandel',
    'Indkøb',
    'Kurér',
    'Kundeservice',
    'Direktion',
    'Finans',
    'Skat',
    'Kvalitetssikring',
    'Import',
    'Juridisk',
    'Marketing',
    'Prissætning',
    'Projekter',
    'People and Management',
    'Logistiktjenester',
    'AMS - Arbejdsmiljø og Sikkerhed',
    'Informationsteknologi',
    'Lager'
  ],
  ja: [
    '管理部',
    '営業部',
    '貿易部',
    '購買部',
    '配送部',
    'カスタマーサービス',
    '取締役会',
    '財務部',
    '税務部',
    '品質保証部',
    '輸入部',
    '法務部',
    'マーケティング部',
    '価格設定部',
    'プロジェクト部',
    '人材部',
    '物流サービス部',
    '労働安全衛生部',
    '情報技術部',
    '倉庫部'
  ],
  hi: [
    'प्रशासन',
    'वाणिज्यिक',
    'विदेश व्यापार',
    'खरीद',
    'कूरियर',
    'ग्राहक सेवा',
    'निदेशक मंडल',
    'वित्त',
    'कर',
    'गुणवत्ता आश्वासन',
    'आयात',
    'कानूनी',
    'विपणन',
    'मूल्य निर्धारण',
    'परियोजनाएं',
    'मानव संसाधन',
    'लॉजिस्टिक्स सेवाएं',
    'व्यावसायिक स्वास्थ्य और सुरक्षा',
    'सूचना प्रौद्योगिकी',
    'गोदाम'
  ]
} as const;

export const CONFIDENTIALITY_NOTICE = {
  pt: {
    title: 'INFORMAÇÃO CONFIDENCIAL',
    text: 'Esta mensagem pode conter informações confidenciais e sujeitas a sigilo. A sua utilização, cópia e divulgação não autorizadas são proibidas e podem implicar em responsabilidades civis e criminais. Caso tenha recebido esta mensagem por engano, por favor informe ao remetente e apague-a juntamente com seus anexos.'
  },
  en_uk: {
    title: 'CONFIDENTIAL INFORMATION',
    text: 'This message may contain confidential and privileged information. Unauthorized use, disclosure or copying is prohibited and may imply in civil and criminal liability. If you are not the intended recipient, please advise the sender and delete this message and any attachments.'
  },
  en_us: {
    title: 'CONFIDENTIAL INFORMATION',
    text: 'This message may contain confidential and privileged information. Unauthorized use, disclosure or copying is prohibited and may result in civil and criminal liability. If you are not the intended recipient, please notify the sender and delete this message and any attachments.'
  },
  de: {
    title: 'VERTRAULICHE INFORMATION',
    text: 'Diese Nachricht kann vertrauliche und geschützte Informationen enthalten. Unbefugte Nutzung, Offenlegung oder Vervielfältigung ist untersagt und kann zivil- und strafrechtliche Folgen haben. Wenn Sie nicht der vorgesehene Empfänger sind, informieren Sie bitte den Absender und löschen Sie diese Nachricht samt Anlagen.'
  },
  fr: {
    title: 'INFORMATION CONFIDENTIELLE',
    text: 'Ce message peut contenir des informations confidentielles et privilégiées. L\'utilisation, la divulgation ou la copie non autorisée est interdite et peut entraîner une responsabilité civile et pénale. Si vous n\'êtes pas le destinataire prévu, veuillez en informer l\'expéditeur et supprimer ce message ainsi que ses pièces jointes.'
  },
  it: {
    title: 'INFORMAZIONE RISERVATA',
    text: 'Questo messaggio può contenere informazioni riservate e privilegiate. L\'uso, la divulgazione o la copia non autorizzati sono vietati e possono comportare responsabilità civili e penali. Se non sei il destinatario previsto, avvisa il mittente e cancella questo messaggio e gli eventuali allegati.'
  },
  rm: {
    title: 'INFURMAZIUN CONFIDENZIALA',
    text: 'Quest messadi po cuntegnair infurmaziuns confidenzialas e privilegiadas. L\'utilisaziun, la publicaziun u la copia nunautoritada è scumandada e po implitgar responsabladad civila e penala. Sche Vus n\'essas betg il destinatur previs, per plaschair infurmai il speditur e stizzai quest messadi ed eventuals supplements.'
  },
  da: {
    title: 'FORTROLIG INFORMATION',
    text: 'Denne meddelelse kan indeholde fortrolige og privilegerede oplysninger. Uautoriseret brug, videregivelse eller kopiering er forbudt og kan medføre civil- og strafferetligt ansvar. Hvis du ikke er den tilsigtede modtager, bedes du underrette afsenderen og slette denne meddelelse og eventuelle vedhæftede filer.'
  },
  ja: {
    title: '機密情報',
    text: 'このメッセージには、機密情報および特権情報が含まれている可能性があります。無断での使用、開示、複製は禁止されており、民事および刑事上の責任が生じる可能性があります。意図された受信者でない場合は、送信者に通知し、このメッセージと添付ファイルを削除してください。'
  },
  hi: {
    title: 'गोपनीय सूचना',
    text: 'इस संदेश में गोपनीय और विशेषाधिकृत जानकारी हो सकती है। अनधिकृत उपयोग, प्रकटीकरण या प्रतिलिपि निषिद्ध है और इससे नागरिक और आपराधिक दायित्व हो सकता है। यदि आप इच्छित प्राप्तकर्ता नहीं हैं, तो कृपया प्रेषक को सूचित करें और इस संदेश और किसी भी अनुलग्नक को हटा दें।'
  }
} as const;

export const COMPANY_LOGOS = {
  'EXAMPLE GROUP': 'https://github.com/jaiel29/Images_public/blob/main/Example.png?raw=true',
  'OFICIAL': 'https://github.com/jaiel29/Images_public/blob/main/Example.png?raw=true'
} as const;

export function formatPhoneNumber(countryCode: string, phoneNumber: string): string {

  const digits = phoneNumber.replace(/\D/g, '');

  if (digits.length === 8) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  } else if (digits.length === 9) {
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  }
  
  return phoneNumber;
}

export function formatPhoneForWhatsApp(countryCode: string, areaCode: string, phoneNumber: string): string {
  const cleanCountryCode = countryCode.replace(/\D/g, '');
  const cleanAreaCode = areaCode.replace(/\D/g, '');
  const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
  
  // Combine all parts without any separators for WhatsApp API
  return `${cleanCountryCode}${cleanAreaCode}${cleanPhoneNumber}`;
}
