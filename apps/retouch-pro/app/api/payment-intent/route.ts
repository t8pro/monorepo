import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

function getStripe() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(apiKey, {
    apiVersion: '2025-10-29.clover',
  });
}

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe();
    const { amount, currency, packageType, photoCount } = await request.json();

    if (!amount || !currency || !packageType || !photoCount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    // Convert amount to cents for Stripe (USD)
    const amountInCents = Math.round(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        packageType,
        photoCount: photoCount.toString(),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 },
    );
  }
}
