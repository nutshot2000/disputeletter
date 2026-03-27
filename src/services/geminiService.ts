import { FormData, DisputeType } from '../types';

// Use relative URL for API - works in both dev and production
const API_BASE_URL = '/api';

export async function generateDisputeLetter(
  disputeType: DisputeType,
  formData: FormData
): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-letter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ disputeType, formData }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to generate letter');
    }

    const data = await response.json();
    return data.letter;
  } catch (error) {
    console.error('Error generating letter:', error);
    throw error;
  }
}