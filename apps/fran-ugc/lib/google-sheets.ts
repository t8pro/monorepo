import { google, sheets_v4 } from 'googleapis';

function getServiceAccountCredentials() {
  const privateWithRealBreak = process.env.GCP_PRIVATE_KEY?.replace(
    /\\n/g,
    '\n',
  );
  const json = {
    type: 'service_account',
    project_id: process.env.GCP_PROJECT_ID,
    private_key_id: process.env.GCP_PRIVATE_KEY_ID,
    private_key: privateWithRealBreak,
    client_email: process.env.GCP_CLIENT_EMAIL,
    client_id: process.env.GCP_CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: process.env.GCP_CLIENT_X509_CERT_URL,
    universe_domain: 'googleapis.com',
  };

  return json;
}

export function getSheetsClient(): sheets_v4.Sheets {
  const creds = getServiceAccountCredentials();
  const auth = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return google.sheets({ version: 'v4', auth });
}

export interface LeadData {
  timestamp: string;
  name: string;
  email: string;
  phone?: string;
  instagram?: string;
  unemployedOrSeekingIncome?: string;
  likesAppearingInVideos?: string;
  wantsCreativeGuide?: string;
  productAffinity?: string;
}

/**
 * Appends a lead row to the Google Sheet
 * @param spreadsheetId - The Google Sheets spreadsheet ID
 * @param sheetName - The name of the sheet/tab (default: 'Sheet1')
 * @param data - The lead data to append
 */
export async function appendLeadToSheet(
  spreadsheetId: string,
  data: LeadData,
  sheetName = 'Sheet1',
): Promise<void> {
  const sheets = getSheetsClient();

  // Format product affinity array as comma-separated string
  const productAffinityStr = Array.isArray(data.productAffinity)
    ? data.productAffinity.join(', ')
    : data.productAffinity || '';

  // Prepare row data matching the spreadsheet columns
  const row = [
    data.timestamp,
    data.name,
    data.email,
    data.phone || '',
    data.instagram || '',
    data.unemployedOrSeekingIncome || '',
    data.likesAppearingInVideos || '',
    data.wantsCreativeGuide || '',
    productAffinityStr,
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:I`, // Adjust range based on your columns
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [row],
    },
  });
}
