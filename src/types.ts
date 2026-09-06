export type Language = 'en' | 'ar';

export type Currency = 'USD' | 'QAR';

export interface DomainItem {
  id: string;
  name: string;
  tld: string;
  sectionId: string;
  subtext: {
    en: string;
    ar: string;
  };
  highlights: {
    en: string[];
    ar: string[];
  };
  characters: number;
  type: string;
  typeAr: string;
  indicativeValuation: {
    usd: number;
    qar: number;
  };
  status: 'Available' | 'Negotiable' | 'Under Offer';
  statusAr: string;
  imageUrl?: string;
  imageAlt?: {
    en: string;
    ar: string;
  };
  registry: string;
  transferTimeline: {
    en: string;
    ar: string;
  };
  atomUrl?: string;
}

export interface SectionData {
  id: string;
  number: number;
  title: {
    en: string;
    ar: string;
  };
  subtitle: {
    en: string;
    ar: string;
  };
  domains: DomainItem[];
}

export interface InquiryFormData {
  domainName: string;
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  budgetRange: string;
  inquiryType: 'end-buyer' | 'broker' | 'corporate' | 'investor';
  message: string;
  requireNda: boolean;
}

export interface PaymentTransaction {
  transactionId: string;
  domainName: string;
  amount: number;
  currency: Currency;
  paymentMethod: 'wire' | 'card' | 'applepay' | 'escrow';
  buyerName: string;
  buyerEmail: string;
  organization?: string;
  registrar: string;
  authCode: string;
  timestamp: string;
}
