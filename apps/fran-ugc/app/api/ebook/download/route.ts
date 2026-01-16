import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const pdfPath = join(process.cwd(), 'public', 'ebook.pdf');
    const buffer = await readFile(pdfPath);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="guia-ugc-gratuito.pdf"',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error reading ebook file:', error);
    return NextResponse.json(
      { error: 'Erro ao baixar o e-book' },
      { status: 500 },
    );
  }
}
