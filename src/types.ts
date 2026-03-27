export type DisputeType =
  | 'security_deposit'
  | 'hoa_violation'
  | 'contractor_work'
  | 'insurance_claim'
  | 'medical_billing'
  | 'product_warranty';

export type LetterTone = 'polite' | 'standard' | 'assertive';

export interface FormData {
  // Universal
  country?: 'US' | 'UK';
  userFullName: string;
  userAddress: string;
  userEmail: string;
  recipientName: string;
  recipientAddress: string;
  incidentDate: string;
  disputeAmount: string;
  situationDescription: string;
  desiredResolution: string;
  state: string;
  letterTone?: LetterTone;

  // Security Deposit
  moveInDate?: string;
  moveOutDate?: string;
  depositAmountPaid?: string;

  // HOA Violation
  hoaName?: string;
  violationDate?: string;
  disputedRule?: string;

  // Contractor
  contractDate?: string;
  workDescription?: string;
  paymentMade?: string;

  // Insurance
  policyNumber?: string;
  claimNumber?: string;
  denialReason?: string;

  // Medical
  providerName?: string;
  billDate?: string;
  serviceDescription?: string;

  // Warranty
  productName?: string;
  purchaseDate?: string;
  warrantyTerms?: string;
}

export const DISPUTE_TYPES: Record<DisputeType, { title: string; description: string; icon: string }> = {
  security_deposit: {
    title: 'Security Deposit Return',
    description: 'Demand your landlord return your security deposit.',
    icon: 'Home',
  },
  hoa_violation: {
    title: 'HOA Violation Response',
    description: 'Fight unfair fines or rules from your HOA.',
    icon: 'ShieldAlert',
  },
  contractor_work: {
    title: 'Contractor Incomplete Work',
    description: 'Demand a contractor finish a job or refund you.',
    icon: 'Hammer',
  },
  insurance_claim: {
    title: 'Insurance Claim Appeal',
    description: 'Appeal a denied insurance claim.',
    icon: 'FileText',
  },
  medical_billing: {
    title: 'Medical Billing Dispute',
    description: 'Dispute incorrect or surprise medical charges.',
    icon: 'Stethoscope',
  },
  product_warranty: {
    title: 'Product Warranty Claim',
    description: 'Demand a replacement or refund for a defective item.',
    icon: 'Package',
  },
};
