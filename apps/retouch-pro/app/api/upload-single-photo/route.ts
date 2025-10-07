/* eslint-disable no-console */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const paymentIntentId = formData.get('paymentIntentId') as string;
    const packageType = formData.get('packageType') as string;
    const photoIndex = formData.get('photoIndex') as string;
    const totalPhotos = formData.get('totalPhotos') as string;
    const photoId = formData.get('photoId') as string;
    const photoName = formData.get('photoName') as string;
    const photoType = formData.get('photoType') as string;
    const photoSize = formData.get('photoSize') as string;
    const photoWidth = formData.get('photoWidth') as string;
    const photoHeight = formData.get('photoHeight') as string;
    const photoFile = formData.get('photo') as File;

    // Validation
    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment intent ID is required' },
        { status: 400 },
      );
    }

    if (!packageType) {
      return NextResponse.json(
        { error: 'Package type is required' },
        { status: 400 },
      );
    }

    if (!photoFile) {
      return NextResponse.json(
        { error: 'Photo file is required' },
        { status: 400 },
      );
    }

    if (!photoId || !photoName || !photoType) {
      return NextResponse.json(
        { error: 'Photo metadata is required' },
        { status: 400 },
      );
    }

    // TODO: Verify payment intent with Stripe to ensure payment was successful
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    // if (paymentIntent.status !== 'succeeded') {
    //   return NextResponse.json({ error: 'Payment not confirmed' }, { status: 400 });
    // }

    // TODO: Process and upload single photo to your storage service
    // This is where you would:
    // 1. Process the photo (resize, optimize, etc.)
    // 2. Upload to your storage service (AWS S3, Cloudinary, etc.)
    // 3. Save metadata to your database

    console.log(`Processing photo ${photoIndex}/${totalPhotos}:`, {
      photoId,
      photoName,
      photoType,
      photoSize: parseInt(photoSize),
      photoWidth: parseInt(photoWidth),
      photoHeight: parseInt(photoHeight),
      fileSize: photoFile.size,
    });

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return success
    return NextResponse.json({
      success: true,
      message: 'Photo processed successfully',
      photoIndex: parseInt(photoIndex),
      totalPhotos: parseInt(totalPhotos),
      photoId,
      photoName,
    });
  } catch (error) {
    console.error('Single photo upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process photo' },
      { status: 500 },
    );
  }
}
