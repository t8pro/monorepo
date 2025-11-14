/**
 * Simple hash generation and validation for ebook downloads
 * Uses a deterministic approach based on email and secret key
 */

const HASH_LENGTH = 5; // 5 digits
const HASH_SECRET =
  process.env.EBOOK_HASH_SECRET || 'fran-ugc-ebook-secret-key-2024';

/**
 * Generate a simple numeric hash from email
 * Deterministic: same email always generates same hash
 */
export function generateEbookHash(email: string): string {
  // Create a simple hash from email + secret
  const combined = email + HASH_SECRET;
  let hash = 0;

  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Make it positive and ensure 5 digits
  const positiveHash = Math.abs(hash) % 100000; // 0-99999 range
  const hashString = positiveHash.toString().padStart(HASH_LENGTH, '0');

  return hashString;
}

/**
 * Validate if a hash is valid
 * Checks if hash format is correct (4-6 digits)
 * Note: In a production system, you'd also validate against a database
 */
export function validateEbookHash(hash: string): boolean {
  // Check if hash is numeric and has correct length (4-6 digits)
  if (!/^\d{4,6}$/.test(hash)) {
    return false;
  }

  // For now, accept any valid format hash
  // In production, you should validate against stored hashes in database
  return true;
}

/**
 * Store hash in memory (for tracking/debugging)
 * In production, use a database or cache like Redis
 */
const hashStore = new Map<string, { email: string; createdAt: number }>();

export function storeEbookHash(hash: string, email: string): void {
  hashStore.set(hash, {
    email,
    createdAt: Date.now(),
  });
}

export function getEbookHash(
  hash: string,
): { email: string; createdAt: number } | null {
  const stored = hashStore.get(hash);
  if (!stored) {
    return null;
  }

  return stored;
}
