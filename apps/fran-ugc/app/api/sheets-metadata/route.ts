import { NextResponse } from 'next/server';
import { getSheetsClient } from '@/lib/google-sheets';

export async function GET() {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    if (!spreadsheetId) {
      return NextResponse.json(
        {
          success: false,
          error: 'GOOGLE_SHEETS_SPREADSHEET_ID is not set',
        },
        { status: 400 },
      );
    }

    const sheets = getSheetsClient();

    // Get spreadsheet metadata to list all sheets
    const metadata = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const sheetNames = metadata.data.sheets?.map(sheet => ({
      sheetId: sheet.properties?.sheetId,
      title: sheet.properties?.title,
      index: sheet.properties?.index,
    }));

    return NextResponse.json({
      success: true,
      spreadsheetTitle: metadata.data.properties?.title,
      spreadsheetId,
      sheets: sheetNames,
      currentConfig: {
        configuredSheetName: process.env.GOOGLE_SHEETS_SHEET_NAME || 'Sheet1',
      },
      hint: 'Use the exact "title" from the sheets array above for GOOGLE_SHEETS_SHEET_NAME',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to list sheets',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
