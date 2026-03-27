import express from 'express';
import { createServer as createViteServer } from 'vite';
import Stripe from 'stripe';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { country } = req.body;
    // DEPLOYMENT NOTE: Replace 'sk_test_...' with your live secret key ('sk_live_...') in your production environment variables.
    const key = process.env.STRIPE_SECRET_KEY;
    
    if (!key) {
      // Fallback to simulated mode if Stripe keys are not configured
      return res.json({ simulated: true });
    }

    const stripe = new Stripe(key);
    const currency = country === 'UK' ? 'gbp' : 'usd';
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1900, // 19.00
      currency,
      automatic_payment_methods: { enabled: true },
      // DEPLOYMENT NOTE: You can add metadata here to track the order in your database
      // metadata: { disputeType: '...', userEmail: '...' }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
});

// DEPLOYMENT NOTE: Add a webhook endpoint here to listen for 'payment_intent.succeeded'
// This is where you would securely save the order to your database (e.g., MongoDB, Postgres)
// and trigger the email service (e.g., Resend, SendGrid) to send a receipt.
// app.post('/api/webhook', express.raw({type: 'application/json'}), (req, res) => { ... });

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
