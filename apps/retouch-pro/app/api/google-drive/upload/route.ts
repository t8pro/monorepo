/* eslint-disable no-console */
import { NextRequest, NextResponse } from 'next/server';
import {
  getDriveClient,
  createFolder,
  uploadFile,
  setFolderAnyoneWithLinkViewer,
  getFolderLink,
} from '@/lib/google-drive';
import { buildOrderFolderName } from '@/lib/order-naming';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get('name') as string | null;
    const email = formData.get('email') as string | null;
    const environment = formData.get('environment') as
      | ('original' | 'white_studio' | 'restaurant')
      | null;
    const packageType = formData.get('packageType') as string | null;
    const totalAmount = formData.get('totalAmount') as string | null;
    const photoCountStr = formData.get('photoCount') as string | null;

    if (!email || !environment) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const parentFolderId =
      process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID || undefined;

    const drive = getDriveClient();

    const now = new Date();
    const folderName = buildOrderFolderName(email, environment, now);
    const folderId = await createFolder(drive, folderName, parentFolderId);

    // Make folder link-accessible (optional, can switch to domain)
    await setFolderAnyoneWithLinkViewer(drive, folderId);

    // Collect photos from formData (robust: iterate all entries)
    const files: Array<{ name: string; contentType: string; buffer: Buffer }> =
      [];
    const foundKeys: string[] = [];
    for (const [key, value] of formData.entries()) {
      if (!key.startsWith('photo_')) continue;
      if (typeof value === 'string') continue;
      const file = value as unknown as File;
      foundKeys.push(key);
      const arrayBuffer = await file.arrayBuffer();
      files.push({
        name: file.name || key,
        contentType: file.type || 'application/octet-stream',
        buffer: Buffer.from(arrayBuffer),
      });
    }

    if (files.length === 0) {
      return NextResponse.json(
        { error: 'No photo files found in request', foundKeys },
        { status: 400 },
      );
    }

    const uploaded: Array<{ id: string; name: string }> = [];
    for (const f of files) {
      try {
        const id = await uploadFile(drive, folderId, {
          name: f.name,
          mimeType: f.contentType,
          buffer: f.buffer,
        });
        uploaded.push({ id, name: f.name });
      } catch (e) {
        console.error('Drive single file upload error:', f.name, e);
        throw e;
      }
    }

    const folderLink = getFolderLink(folderId);

    return NextResponse.json({
      success: true,
      folderId,
      folderLink,
      files: uploaded,
      meta: {
        name,
        email,
        environment,
        packageType,
        totalAmount,
        photoCount: photoCountStr ? Number(photoCountStr) : undefined,
      },
    });
  } catch (error) {
    console.error('Drive upload error:', error);
    const message =
      error instanceof Error
        ? error.message
        : 'Failed to upload to Google Drive';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
