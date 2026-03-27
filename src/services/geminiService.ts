import { GoogleGenAI } from '@google/genai';
import { FormData, DisputeType, DISPUTE_TYPES } from '../types';

export async function generateDisputeLetter(
  disputeType: DisputeType,
  formData: FormData
): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const typeInfo = DISPUTE_TYPES[disputeType];
  const countryName = formData.country === 'UK' ? 'United Kingdom' : 'United States';
  const regionLabel = formData.country === 'UK' ? 'Region/Nation' : 'State';
  const currencySymbol = formData.country === 'UK' ? '£' : '$';

  let specificDetails = '';
  switch (disputeType) {
    case 'security_deposit':
      specificDetails = `
Move-in date: ${formData.moveInDate}
Move-out date: ${formData.moveOutDate}
Deposit amount paid: ${currencySymbol}${formData.depositAmountPaid}
      `;
      break;
    case 'hoa_violation':
      specificDetails = `
HOA Name: ${formData.hoaName}
Violation date: ${formData.violationDate}
Rule being disputed: ${formData.disputedRule}
      `;
      break;
    case 'contractor_work':
      specificDetails = `
Contract date: ${formData.contractDate}
Work description: ${formData.workDescription}
Payment made: ${currencySymbol}${formData.paymentMade}
      `;
      break;
    case 'insurance_claim':
      specificDetails = `
Policy number: ${formData.policyNumber}
Claim number: ${formData.claimNumber}
Denial reason: ${formData.denialReason}
      `;
      break;
    case 'medical_billing':
      specificDetails = `
Provider name: ${formData.providerName}
Bill date: ${formData.billDate}
Service description: ${formData.serviceDescription}
      `;
      break;
    case 'product_warranty':
      specificDetails = `
Product name: ${formData.productName}
Purchase date: ${formData.purchaseDate}
Warranty terms: ${formData.warrantyTerms}
      `;
      break;
  }

  const toneInstruction = 
    formData.letterTone === 'polite' ? 'Polite and collaborative, but clear about the demands. Good for preserving relationships.' :
    formData.letterTone === 'assertive' ? 'Highly assertive, emphasizing strict legal compliance and immediate threat of litigation/reporting if ignored.' :
    'Firm, professional, and assertive (standard legal demand tone).';

  const prompt = `Generate a professional legal demand letter for a ${typeInfo.title}.

CRITICAL INSTRUCTIONS:
- The letter MUST be written in English only.
- The jurisdiction is: ${countryName}, specifically the ${regionLabel} of ${formData.state}.
- You MUST cite relevant laws and legal standards appropriate for this specific jurisdiction (e.g., specific state laws for the US, or England/Wales/Scotland/NI laws for the UK).

Sender (User):
Name: ${formData.userFullName}
Address: ${formData.userAddress}

Recipient:
Name: ${formData.recipientName}
Address: ${formData.recipientAddress}

Incident Date: ${formData.incidentDate}
Amount in Dispute: ${currencySymbol}${formData.disputeAmount}
${regionLabel}: ${formData.state}
Country: ${countryName}

Situation Description:
${formData.situationDescription}

Desired Resolution:
${formData.desiredResolution}

Specific Details:
${specificDetails}

Requirements:
1. Formal business letter format (Date, Sender Address, Recipient Address, Subject Line, Salutation, Body, Closing, Signature block).
2. Reference relevant laws for ${formData.state}, ${countryName} regarding this type of dispute.
3. Demand the desired resolution within a reasonable timeframe (e.g., 14-30 days).
4. Mention consequences of non-compliance (e.g., small claims court, filing complaints with regulatory agencies).
5. Tone: ${toneInstruction}
6. Include all relevant dates and amounts using the correct currency symbol (${currencySymbol}).
7. Do not include any markdown formatting for the letter itself, just plain text with appropriate line breaks, or simple markdown that renders well as a letter.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.3,
        systemInstruction: "You are an expert legal assistant. Generate professional, legally sound demand letters based on user input. Do not provide legal advice, just draft the letter.",
      },
    });

    return response.text || 'Error generating letter.';
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to generate letter. Please try again.');
  }
}
