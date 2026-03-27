// Vercel Serverless Function for Stripe Payment Intent
import Stripe from 'stripe';

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
    const { country } = req.body;
    
    // Get Stripe key from environment
    const key = process.env.STRIPE_SECRET_KEY;
    
    if (!key) {
      console.log('Stripe key not configured, returning simulated mode');
      return res.json({ simulated: true });
    }

    const stripe = new Stripe(key);
    const currency = country === 'UK' ? 'gbp' : 'usd';
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1900, // £19.00 or $19.00
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        service: 'disputeletter',
        country: country || 'US'
      }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
}
