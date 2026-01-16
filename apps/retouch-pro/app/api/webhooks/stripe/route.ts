/* eslint-disable no-console */
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getTransporter } from '@/lib/email';

function getStripe() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(apiKey, {
    apiVersion: '2025-10-29.clover',
  });
}

const LEAD_NOTIFICATION_EMAIL = 'contato@francieliazevedo.com.br';

async function sendLeadNotificationEmail(orderData: {
  customerName: string;
  customerEmail: string;
  environment: string;
  packageType: string;
  photoCount: number;
  amount: number;
  currency: string;
  paymentIntentId: string;
}) {
  try {
    const transporter = getTransporter();

    const environmentLabels: Record<string, string> = {
      original: 'Manter ambiente original da foto',
      white_studio: 'Usar estúdio infinito branco',
      restaurant: 'Usar ambiente de restaurante',
    };

    const htmlContent = `
      <h2>🎉 Novo Pedido de Retoque Recebido!</h2>
      <p>Um novo pagamento foi confirmado. Aqui estão os detalhes do lead:</p>

      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Nome do Cliente</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${orderData.customerName}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background: #f9f9f9;"><strong>E-mail</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${orderData.customerEmail}">${orderData.customerEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Preferência de Ambiente</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${environmentLabels[orderData.environment] || orderData.environment}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Pacote</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${orderData.packageType}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Quantidade de Fotos</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${orderData.photoCount}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Valor Pago</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${orderData.currency.toUpperCase()} ${orderData.amount.toFixed(2)}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background: #f9f9f9;"><strong>ID do Pagamento</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${orderData.paymentIntentId}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Data/Hora</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</td>
        </tr>
      </table>

      <p style="margin-top: 20px; color: #666;">
        <em>O cliente fará o upload das fotos em seguida. Você receberá outro e-mail quando as fotos forem enviadas.</em>
      </p>
    `;

    await transporter.sendMail({
      from: `Retouch Pro <${process.env.EMAIL_USER}>`,
      to: LEAD_NOTIFICATION_EMAIL,
      subject: `🆕 Novo Pedido - ${orderData.customerName} (${orderData.packageType})`,
      html: htmlContent,
    });

    console.log(`Lead notification email sent to ${LEAD_NOTIFICATION_EMAIL}`);
  } catch (error) {
    console.error('Failed to send lead notification email:', error);
    // Don't throw - email failure shouldn't break the webhook
  }
}

// Store processed webhook IDs to prevent duplicate processing (in-memory cache)
const processedWebhooks = new Set<string>();

// Clean up old webhook IDs periodically (keep only last 1000)
function cleanupProcessedWebhooks() {
  if (processedWebhooks.size > 1000) {
    const arr = Array.from(processedWebhooks);
    processedWebhooks.clear();
    arr.slice(-500).forEach(id => processedWebhooks.add(id));
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      console.error('Webhook: Missing stripe-signature header');
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('Webhook: STRIPE_WEBHOOK_SECRET not configured');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 },
      );
    }

    const stripe = getStripe();

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        {
          error: `Webhook signature verification failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
        },
        { status: 400 },
      );
    }

    // Check for duplicate webhook processing (idempotency)
    const webhookId = event.id;
    if (processedWebhooks.has(webhookId)) {
      console.log(`Webhook ${webhookId} already processed, skipping`);
      return NextResponse.json({ received: true, duplicate: true });
    }

    console.log(`Webhook received: ${event.type} (ID: ${webhookId})`);

    // Handle payment_intent.succeeded event
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      console.log('Payment succeeded:', {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        metadata: paymentIntent.metadata,
      });

      // Extract metadata from payment intent
      const {
        customerName,
        customerEmail,
        environment,
        packageType,
        photoCount,
      } = paymentIntent.metadata;

      if (!customerEmail || !environment || !packageType || !photoCount) {
        console.error(
          'Webhook: Missing required metadata',
          paymentIntent.metadata,
        );
        // Mark as processed to avoid retry loops
        processedWebhooks.add(webhookId);
        cleanupProcessedWebhooks();
        return NextResponse.json(
          { error: 'Missing required metadata' },
          { status: 400 },
        );
      }

      // Create a flag in memory/storage that payment is confirmed
      // The client will poll for this status and then upload photos
      try {
        // Store payment confirmation in a way that the client can check
        // For now, we'll use a simple in-memory store
        // In production, you'd want to use Redis or a database
        const orderId = paymentIntent.id;

        // Set the order as confirmed
        confirmedOrders.set(orderId, {
          paymentIntentId: orderId,
          customerName: customerName || 'Customer',
          customerEmail,
          environment: environment as
            | 'original'
            | 'white_studio'
            | 'restaurant',
          packageType,
          photoCount: parseInt(photoCount),
          amount: paymentIntent.amount / 100, // Convert from cents
          currency: paymentIntent.currency,
          confirmedAt: new Date().toISOString(),
          status: 'confirmed',
        });

        console.log(`Order ${orderId} marked as confirmed, waiting for photos`);

        // Send lead notification email
        await sendLeadNotificationEmail({
          customerName: customerName || 'Customer',
          customerEmail,
          environment,
          packageType,
          photoCount: parseInt(photoCount),
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
          paymentIntentId: orderId,
        });

        // Mark webhook as processed
        processedWebhooks.add(webhookId);
        cleanupProcessedWebhooks();

        return NextResponse.json({
          received: true,
          orderId,
          status: 'confirmed',
        });
      } catch (error) {
        console.error('Webhook: Error processing payment confirmation:', error);
        // Don't mark as processed so it can retry
        return NextResponse.json(
          { error: 'Failed to process payment confirmation' },
          { status: 500 },
        );
      }
    }

    // Handle other event types if needed
    console.log(`Webhook event ${event.type} not handled`);

    // Mark as processed even if not handled
    processedWebhooks.add(webhookId);
    cleanupProcessedWebhooks();

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook: Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

// In-memory store for confirmed orders (waiting for photo upload)
// In production, use Redis or a database
const confirmedOrders = new Map<
  string,
  {
    paymentIntentId: string;
    customerName: string;
    customerEmail: string;
    environment: 'original' | 'white_studio' | 'restaurant';
    packageType: string;
    photoCount: number;
    amount: number;
    currency: string;
    confirmedAt: string;
    status: 'confirmed' | 'uploading' | 'completed' | 'failed';
    driveLink?: string;
    error?: string;
  }
>();

// Clean up old orders periodically (older than 24 hours)
setInterval(
  () => {
    const now = Date.now();
    const twentyFourHoursAgo = now - 24 * 60 * 60 * 1000;

    for (const [orderId, order] of confirmedOrders.entries()) {
      const confirmedAt = new Date(order.confirmedAt).getTime();
      if (confirmedAt < twentyFourHoursAgo) {
        confirmedOrders.delete(orderId);
        console.log(`Cleaned up old order: ${orderId}`);
      }
    }
  },
  60 * 60 * 1000,
); // Run every hour
