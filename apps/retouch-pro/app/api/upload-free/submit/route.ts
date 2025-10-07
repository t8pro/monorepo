/* eslint-disable no-console */
import { NextResponse } from 'next/server';
import {
  uploadFreeTemplate,
  type UploadFreeTemplateData,
} from '@/app/templates/upload-free';
import { getTransporter } from '@/lib/email';
import {
  getDriveClient,
  createFolder,
  uploadFile,
  setFolderAnyoneWithLinkViewer,
  getFolderLink,
} from '@/lib/google-drive';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = (formData.get('name') as string | null)?.trim() || '';
    const email = (formData.get('email') as string | null)?.trim() || '';
    const phone = (formData.get('phone') as string | null)?.trim() || '';
    const company = (formData.get('company') as string | null)?.trim() || '';
    const file = formData.get('photo') as unknown as File | null;

    if (!name || !email || !phone || !company) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }
    if (!file) {
      return NextResponse.json({ error: 'Photo is required' }, { status: 400 });
    }

    // Build folder name: "{email} {YYYY-MM-DD HH:mm:ss} FREE"
    const pad = (n: number) => String(n).padStart(2, '0');
    const now = new Date();
    const ts = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const folderName = `${email} ${ts} FREE`;

    const parentFolderId =
      process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID || undefined;
    const drive = getDriveClient();

    const folderId = await createFolder(drive, folderName, parentFolderId);
    await setFolderAnyoneWithLinkViewer(drive, folderId);

    // Upload single photo
    const arrayBuffer = await file.arrayBuffer();
    await uploadFile(drive, folderId, {
      name: file.name || 'photo',
      mimeType: file.type || 'application/octet-stream',
      buffer: Buffer.from(arrayBuffer),
    });

    const folderLink = getFolderLink(folderId);

    // Send HTML email using handlebars template
    const transporter = getTransporter();
    const handlebars = await import('handlebars');
    const template =
      handlebars.compile<UploadFreeTemplateData>(uploadFreeTemplate);
    const html = template({
      name,
      email,
      phone,
      company,
      fileName: file.name,
      fileSizeKB: Math.round((file.size || 0) / 1024),
      submittedAt: now.toISOString(),
      folderLink,
    });

    await transporter.sendMail({
      from: `Retouch Pro <${process.env.EMAIL_USER}>`,
      to: 'contact@t8pro.us',
      subject: `Free Retouch Request - ${name}`,
      html,
    });

    return NextResponse.json({
      success: true,
      receivedAt: now.toISOString(),
      folderLink,
    });
  } catch (error) {
    console.error('upload-free submit error:', error);
    const message = error instanceof Error ? error.message : 'Failed to submit';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
