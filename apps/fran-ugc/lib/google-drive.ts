import { Readable } from 'node:stream';
import { google, drive_v3 } from 'googleapis';

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

export function getDriveClient(): drive_v3.Drive {
  const creds = getServiceAccountCredentials();
  const auth = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: [
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/drive.readonly',
    ],
  });
  return google.drive({ version: 'v3', auth });
}

export async function getFolderMetadata(
  drive: drive_v3.Drive,
  folderId: string,
): Promise<drive_v3.Schema$File> {
  const res = await drive.files.get({
    fileId: folderId,
    fields: 'id, name, mimeType, driveId, parents',
    supportsAllDrives: true,
  });
  return res.data;
}

export function isSharedDriveItem(
  file: drive_v3.Schema$File | null | undefined,
): boolean {
  return Boolean(file && file.driveId);
}

export async function createFolder(
  drive: drive_v3.Drive,
  name: string,
  parentFolderId?: string,
): Promise<string> {
  const res = await drive.files.create({
    requestBody: {
      name,
      mimeType: 'application/vnd.google-apps.folder',
      parents: parentFolderId ? [parentFolderId] : undefined,
    },
    fields: 'id',
    supportsAllDrives: true,
  });
  const id = res.data.id;
  if (!id) throw new Error('Failed to create Google Drive folder');
  return id;
}

export async function uploadFile(
  drive: drive_v3.Drive,
  folderId: string,
  file: { name: string; mimeType: string; buffer: Buffer },
): Promise<string> {
  const res = await drive.files.create({
    requestBody: {
      name: file.name,
      parents: [folderId],
    },
    media: {
      mimeType: file.mimeType,
      body: Readable.from(file.buffer),
    },
    fields: 'id',
    supportsAllDrives: true,
  });
  const id = res.data.id;
  if (!id)
    throw new Error(`Failed to upload file ${file.name} to Google Drive`);
  return id;
}

export async function setFolderAnyoneWithLinkViewer(
  drive: drive_v3.Drive,
  folderId: string,
): Promise<void> {
  await drive.permissions.create({
    fileId: folderId,
    requestBody: {
      role: 'reader',
      type: 'anyone',
    },
    supportsAllDrives: true,
  });
}

export function getFolderLink(folderId: string): string {
  return `https://drive.google.com/drive/folders/${folderId}`;
}
