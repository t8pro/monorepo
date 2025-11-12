export type EnvironmentOption = 'original' | 'white_studio' | 'restaurant';

export function mapEnvironmentToNumber(env: EnvironmentOption): 1 | 2 | 3 {
  switch (env) {
    case 'original':
      return 1;
    case 'white_studio':
      return 2;
    case 'restaurant':
      return 3;
  }
}

export function formatTimestamp(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const mi = pad(date.getMinutes());
  const ss = pad(date.getSeconds());
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

export function sanitizeForDrive(name: string): string {
  // Drive is permissive, but we strip control chars and collapse whitespace
  return name
    .replace(/[\n\r\t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function buildOrderFolderName(
  email: string,
  environment: EnvironmentOption,
  date: Date,
): string {
  const envNum = mapEnvironmentToNumber(environment);
  const ts = formatTimestamp(date);
  return sanitizeForDrive(`${email} ${ts} ${envNum}`);
}
