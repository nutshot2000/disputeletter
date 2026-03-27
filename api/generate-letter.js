// API route to generate dispute letter server-side
import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { disputeType, formData } = req.body;
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Build the prompt based on dispute type
    const countryName = formData.country === 'UK' ? 'United Kingdom' : 'United States';
    const regionLabel = formData.country === 'UK' ? 'Region/Nation' : 'State';
    const currencySymbol = formData.country === 'UK' ? '£' : '$';

    const toneInstruction = 
      formData.letterTone === 'polite' ? 'Polite and collaborative, but clear about the demands.' :
      formData.letterTone === 'assertive' ? 'Highly assertive, emphasizing strict legal compliance and immediate threat of litigation.' :
      'Firm, professional, and assertive (standard legal demand tone).';

    const excludedKeys = new Set(['country', 'userFullName', 'userAddress', 'userEmail', 'userPhone', 'recipientName', 'recipientAddress', 'incidentDate', 'disputeAmount', 'state', 'situationDescription', 'desiredResolution', 'letterTone']);
    const extraFields = Object.keys(formData)
      .filter(k => !excludedKeys.has(k) && formData[k])
      .map(k => `${k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: ${formData[k]}`)
      .join('\n');

    const prompt = `Generate a professional legal demand letter for a ${disputeType} dispute.

CRITICAL: Write in English only. Jurisdiction: ${countryName}, ${regionLabel}: ${formData.state}

Sender Details:
Name: ${formData.userFullName}
Address: ${formData.userAddress}
Email: ${formData.userEmail || '[Not Provided]'}
Phone: ${formData.userPhone || '[Not Provided]'}

Recipient Details:
Name: ${formData.recipientName}
Address: ${formData.recipientAddress}

Dispute Info:
Date of Incident: ${formData.incidentDate}
Amount in Dispute: ${currencySymbol}${formData.disputeAmount}
${extraFields ? '\\nAdditional Details:\\n' + extraFields : ''}

Situation:
${formData.situationDescription}

Desired Resolution:
${formData.desiredResolution}

Requirements:
1. Formal business letter format
2. Reference relevant laws for ${formData.state}, ${countryName}
3. Demand resolution within 14-30 days
4. Mention legal consequences
5. Tone: ${toneInstruction}
6. Use currency symbol: ${currencySymbol}

Generate only the letter text, no markdown headers.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.3,
      },
    });

    return res.json({ letter: response.text || 'Error generating letter.' });
  } catch (error) {
    console.error('Gemini API error:', error);
    res.status(500).json({ error: 'Failed to generate letter' });
  }
}