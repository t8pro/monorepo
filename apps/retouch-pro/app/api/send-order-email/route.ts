/* eslint-disable no-console */
import { NextRequest, NextResponse } from 'next/server';
import { getTransporter } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form data
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const environment = formData.get('environment') as string;
    const packageType = formData.get('packageType') as string;
    const totalAmount = formData.get('totalAmount') as string;
    const photoCount = formData.get('photoCount') as string;
    const folderLink = (formData.get('folderLink') as string) || '';

    // Validate required fields
    if (
      !name ||
      !email ||
      !environment ||
      !packageType ||
      !totalAmount ||
      !photoCount
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    // Get photo files
    const photoFiles: File[] = [];
    let fileIndex = 0;
    while (formData.has(`photo_${fileIndex}`)) {
      const file = formData.get(`photo_${fileIndex}`) as File;
      if (file) {
        photoFiles.push(file);
      }
      fileIndex++;
    }

    if (photoFiles.length === 0) {
      return NextResponse.json(
        { error: 'No photos provided' },
        { status: 400 },
      );
    }

    // Get email transporter
    const transporter = getTransporter();

    // Prepare email content
    const environmentLabels = {
      original: 'Maintain environment original photo',
      white_studio: 'Use white infinity studio',
      restaurant: 'Use a restaurant environment',
    };

    const htmlContent = `
      <h2>New Photo Retouching Order</h2>
      <p><strong>Customer Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Environment Preference:</strong> ${environmentLabels[environment as keyof typeof environmentLabels]}</p>
      <p><strong>Package Type:</strong> ${packageType}</p>
      <p><strong>Total Amount:</strong> $${totalAmount}</p>
      <p><strong>Number of Photos:</strong> ${photoCount}</p>
      <p><strong>Order Date:</strong> ${new Date().toLocaleString()}</p>
      ${folderLink ? `<p><strong>Google Drive Folder:</strong> <a href="${folderLink}">${folderLink}</a></p>` : ''}
      
      <h3>Photos Attached:</h3>
      <ul>
        ${photoFiles.map(file => `<li>${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)</li>`).join('')}
      </ul>
    `;

    // Prepare attachments
    const attachments = await Promise.all(
      photoFiles.map(async file => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
        contentType: file.type,
      })),
    );

    // Send email
    await transporter.sendMail({
      from: `Retouch Pro <${process.env.EMAIL_USER}>`,
      to: 'contact@t8pro.us',
      subject: `New Photo Retouching Order - ${name} (${packageType})`,
      html: htmlContent,
      attachments,
    });

    return NextResponse.json({
      success: true,
      message: 'Order email sent successfully',
    });
  } catch (error) {
    console.error('Error sending order email:', error);
    return NextResponse.json(
      { error: 'Failed to send order email' },
      { status: 500 },
    );
  }
}
