/**
 * Portal de Assinaturas
 * 
 * @copyright 2025 JAIEL JOHABE MACEDO BARBOZA
 * @license MIT
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { SignatureFormData, LANGUAGES, DEPARTMENTS, ROLES_BY_LANGUAGE } from '../types';
import { clsx } from 'clsx';
import { Globe, MessageSquare } from 'lucide-react';

interface SignatureFormProps {
  onSubmit: (data: SignatureFormData) => void;
}

const COMPANIES = [
  'Example GROUP',
  'OFICIAL'
].sort();

const FIELD_LABELS = {
  pt: {
    firstName: 'Nome',
    lastName: 'Sobrenome',
    email: 'Usuário',
    domain: 'Domínio',
    country: 'País',
    areaCode: 'DDD',
    phoneNumber: 'Número',
    extension: 'Ramal',
    department: 'Departamento',
    role: 'Cargo',
    company: 'Empresa',
    generate: 'Gerar Assinatura',
    selectDomain: 'Selecione o domínio',
    selectDepartment: 'Selecione o departamento',
    selectRole: 'Selecione o cargo (opcional)',
    selectCompany: 'Selecione a empresa',
  },
  en_uk: {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'User',
    domain: 'Domain',
    country: 'Country',
    areaCode: 'Area Code',
    phoneNumber: 'Phone Number',
    extension: 'Extension',
    department: 'Department',
    role: 'Role',
    company: 'Company',
    generate: 'Generate Signature',
    selectDomain: 'Select domain',
    selectDepartment: 'Select department',
    selectRole: 'Select role (optional)',
    selectCompany: 'Select company',
  },
  en_us: {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'User',
    domain: 'Domain',
    country: 'Country',
    areaCode: 'Area Code',
    phoneNumber: 'Phone Number',
    extension: 'Extension',
    department: 'Department',
    role: 'Role',
    company: 'Company',
    generate: 'Generate Signature',
    selectDomain: 'Select domain',
    selectDepartment: 'Select department',
    selectRole: 'Select role (optional)',
    selectCompany: 'Select company',
  },
  de: {
    firstName: 'Vorname',
    lastName: 'Nachname',
    email: 'E-Mail',
    domain: 'Domain',
    country: 'Land',
    areaCode: 'Vorwahl',
    phoneNumber: 'Telefonnummer',
    extension: 'Durchwahl',
    department: 'Abteilung',
    role: 'Position',
    company: 'Unternehmen',
    generate: 'Signatur generieren',
    selectDomain: 'Domain auswählen',
    selectDepartment: 'Abteilung auswählen',
    selectRole: 'Position auswählen (optional)',
    selectCompany: 'Unternehmen auswählen',
  },
  fr: {
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Email',
    domain: 'Domaine',
    country: 'Pays',
    areaCode: 'Indicatif',
    phoneNumber: 'Numéro',
    extension: 'Extension',
    department: 'Département',
    role: 'Poste',
    company: 'Entreprise',
    generate: 'Générer la signature',
    selectDomain: 'Sélectionner le domaine',
    selectDepartment: 'Sélectionner le département',
    selectRole: 'Sélectionner le poste (optionnel)',
    selectCompany: 'Sélectionner l\'entreprise',
  },
  it: {
    firstName: 'Nome',
    lastName: 'Cognome',
    email: 'Email',
    domain: 'Dominio',
    country: 'Paese',
    areaCode: 'Prefisso',
    phoneNumber: 'Numero',
    extension: 'Interno',
    department: 'Dipartimento',
    role: 'Ruolo',
    company: 'Azienda',
    generate: 'Genera firma',
    selectDomain: 'Seleziona dominio',
    selectDepartment: 'Seleziona dipartimento',
    selectRole: 'Seleziona ruolo (opzionale)',
    selectCompany: 'Seleziona azienda',
  },
  rm: {
    firstName: 'Prenum',
    lastName: 'Num',
    email: 'Email',
    domain: 'Domain',
    country: 'Pajais',
    areaCode: 'Code local',
    phoneNumber: 'Numer',
    extension: 'Extension',
    department: 'Departament',
    role: 'Rolla',
    company: 'Interpresa',
    generate: 'Generar suttascripziun',
    selectDomain: 'Tscherna domain',
    selectDepartment: 'Tscherna departament',
    selectRole: 'Tscherna rolla (opziunal)',
    selectCompany: 'Tscherna interpresa',
  },
  da: {
    firstName: 'Fornavn',
    lastName: 'Efternavn',
    email: 'Email',
    domain: 'Domæne',
    country: 'Land',
    areaCode: 'Områdekode',
    phoneNumber: 'Nummer',
    extension: 'Lokalnummer',
    department: 'Afdeling',
    role: 'Stilling',
    company: 'Virksomhed',
    generate: 'Generer signatur',
    selectDomain: 'Vælg domæne',
    selectDepartment: 'Vælg afdeling',
    selectRole: 'Vælg stilling (valgfrit)',
    selectCompany: 'Vælg virksomhed',
  },
  ja: {
    firstName: '名',
    lastName: '姓',
    email: 'メール',
    domain: 'ドメイン',
    country: '国',
    areaCode: '市外局番',
    phoneNumber: '電話番号',
    extension: '内線',
    department: '部署',
    role: '役職',
    company: '会社',
    generate: '署名を生成',
    selectDomain: 'ドメインを選択',
    selectDepartment: '部署を選択',
    selectRole: '役職を選択（任意）',
    selectCompany: '会社を選択',
  },
  hi: {
    firstName: 'पहला नाम',
    lastName: 'उपनाम',
    email: 'ईमेल',
    domain: 'डोमेन',
    country: 'देश',
    areaCode: 'एसटीडी कोड',
    phoneNumber: 'फ़ोन नंबर',
    extension: 'एक्सटेंशन',
    department: 'विभाग',
    role: 'पद',
    company: 'कंपनी',
    generate: 'हस्ताक्षर बनाएं',
    selectDomain: 'डोमेन चुनें',
    selectDepartment: 'विभाग चुनें',
    selectRole: 'पद चुनें (वैकल्पिक)',
    selectCompany: 'कंपनी चुनें',
  }
} as const;

export function SignatureForm({ onSubmit }: SignatureFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignatureFormData>({
    defaultValues: {
      language: 'pt',
      defaultBilingual: true,
      emailDomain: '@example.com.br',
      company: 'OFICIAL',
      phoneCountry: '+55',
    }
  });

  const language = watch('language') as keyof typeof FIELD_LABELS;
  const defaultBilingual = watch('defaultBilingual');
  const phoneArea = watch('phoneArea');
  const phoneNumber = watch('phoneNumber');

  const labels = FIELD_LABELS[language];
  const departments = DEPARTMENTS[language];
  const roles = ROLES_BY_LANGUAGE[language];

  const isValidPhoneNumber = () => {
    if (!phoneArea || !phoneNumber) return true;
    return phoneArea.length === 2 && phoneNumber.length >= 8;
  };

  const onSubmitWrapper = (data: SignatureFormData) => {
    if (!isValidPhoneNumber()) return;
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitWrapper)} className="space-y-6 bg-white/95 backdrop-blur-sm rounded-lg p-8 shadow-xl">
      <div className="flex items-center justify-end space-x-4 mb-4 border-b border-green-100 pb-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register('defaultBilingual')}
            id="defaultBilingual"
            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <label htmlFor="defaultBilingual" className="text-sm text-gray-700">
            Bilíngue (PT/EN)
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-green-600" />
          <select
            {...register('language')}
            className="block rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            {Object.entries(LANGUAGES ).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            {labels.firstName}
          </label>
          <input
            type="text"
            id="firstName"
            {...register('firstName', { required: true })}
            className={clsx(
              'mt-1 block w-full rounded-md shadow-sm',
              'border-gray-300 focus:border-green-500 focus:ring-green-500',
              errors.firstName && 'border-red-300'
            )}
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            {labels.lastName}
          </label >
          <input
            type="text"
            id="lastName"
            {...register('lastName', { required: true })}
            className={clsx(
              'mt-1 block w-full rounded-md shadow-sm',
              'border-gray-300 focus:border-green-500 focus:ring-green-500',
              errors.lastName && 'border-red-300'
            )}
          />
        </div>

        <div>
          <label htmlFor="emailUser" className="block text-sm font-medium text-gray-700">
            {labels.email}
          </label>
          <input
            type="text"
            id="emailUser"
            {...register('emailUser', { required: true })}
            className={clsx(
              'mt-1 block w-full rounded-md shadow-sm',
              'border-gray-300 focus:border-green-500 focus:ring-green-500',
              errors.emailUser && 'border-red-300'
            )}
          />
        </div>

        <div>
          <label htmlFor="emailDomain" className="block text-sm font-medium text-gray-700">
            {labels.domain}
          </label>
          <select
            id="emailDomain"
            {...register('emailDomain', { required: true })}
            className={clsx(
              'mt-1 block w-full rounded-md shadow-sm',
              'border-gray-300 focus:border-green-500 focus:ring-green-500',
              errors.emailDomain && 'border-red-300'
            )}
          >
            {[
              '@examplegroup.com.br',
              '@examplegroup.com',
              '@examplegroupglobal.com',
              '@examplegroupglobal.com.br'
            ].sort().map(domain => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="phoneCountry" className="block text-sm font-medium text-gray-700">
              {labels.country}
            </label>
            <select
              id="phoneCountry"
              {...register('phoneCountry')}
              className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-green-500 focus:ring-green-500"
            >
              <option value="">-</option>
              {['+55', '+1', '+44', '+49', '+33', '+39', '+41', '+45', '+81', '+91'].map(code => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="phoneArea" className="block text-sm font-medium text-gray-700">
              {labels.areaCode}
            </label>
            <input
              type="text"
              id="phoneArea"
              maxLength={2}
              {...register('phoneArea')}
              className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              {labels.phoneNumber}
            </label>
            <input
              type="text"
              id="phoneNumber"
              {...register('phoneNumber')}
              className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="ramal" className="block text-sm font-medium text-gray-700">
            {labels.extension}
          </label>
          <input
            type="text"
            id="ramal"
            {...register('ramal')}
            className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">
            {labels.department}
          </label>
          <select
            id="department"
            {...register('department', { required: true })}
            className={clsx(
              'mt-1 block w-full rounded-md shadow-sm',
              'border-gray-300 focus:border-green-500 focus:ring-green-500',
              errors.department && 'border-red-300'
            )}
          >
            <option value="">{labels.selectDepartment}</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            {labels.role}
          </label>
          <select
            id="role"
            {...register('role')}
            className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-green-500 focus:ring-green-500"
          >
            <option value="">{labels.selectRole}</option>
            {roles.map(role => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            {labels.company}
          </label>
          <select
            id="company"
            {...register('company', { required: true })}
            className={clsx(
              'mt-1 block w-full rounded-md shadow-sm',
              'border-gray-300 focus:border-green-500 focus:ring-green-500',
              errors.company && 'border-red-300'
            )}
          >
            {COMPANIES.map(company => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="pt-5">
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
        >
          {labels.generate}
        </button>
      </div>
    </form>
  );
}
