import { Readable } from 'node:stream';
import { NextResponse } from 'next/server';
import { getDriveClient } from '@/lib/google-drive';

const EBOOK_FILE_ID = '1h1WZJds4tjxoco-QYNueSHVn1jWFGOYZ';

export async function GET() {
  try {
    const drive = getDriveClient();

    // Get file metadata first
    const fileMetadata = await drive.files.get({
      fileId: EBOOK_FILE_ID,
      fields: 'name, mimeType',
      supportsAllDrives: true,
    });

    const filename = fileMetadata.data.name || 'guia-ugc-gratuito.pdf';
    const mimeType = fileMetadata.data.mimeType || 'application/pdf';

    // Download file from Google Drive
    const response = await drive.files.get(
      {
        fileId: EBOOK_FILE_ID,
        alt: 'media',
        supportsAllDrives: true,
      },
      {
        responseType: 'stream',
      },
    );

    // Convert stream to buffer
    const chunks: Buffer[] = [];
    const stream = response.data as Readable;

    for await (const chunk of stream) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }

    const buffer = Buffer.concat(chunks);

    // Return file as download
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error downloading ebook from Google Drive:', error);
    return NextResponse.json(
      { error: 'Erro ao baixar o e-book' },
      { status: 500 },
    );
  }
}
