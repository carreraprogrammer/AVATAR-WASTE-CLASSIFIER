/**
 * Validator Utilities
 * Helper functions for input validation
 */

/**
 * Validate email address
 * @param email Email string
 * @returns True if valid email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate UUID
 * @param uuid UUID string
 * @returns True if valid UUID
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Validate base64 image string
 * @param base64 Base64 string
 * @returns True if valid base64 image
 */
export function isValidBase64Image(base64: string): boolean {
  const regex = /^data:image\/(png|jpeg|jpg|gif|webp);base64,/;
  return regex.test(base64);
}

/**
 * Validate URL
 * @param url URL string
 * @returns True if valid URL
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate confidence score (0-1)
 * @param score Confidence score
 * @returns True if valid confidence score
 */
export function isValidConfidence(score: number): boolean {
  return typeof score === 'number' && score >= 0 && score <= 1;
}

/**
 * Validate positive number
 * @param num Number
 * @returns True if positive number
 */
export function isPositiveNumber(num: number): boolean {
  return typeof num === 'number' && !isNaN(num) && num > 0;
}

/**
 * Validate non-negative number
 * @param num Number
 * @returns True if non-negative number
 */
export function isNonNegativeNumber(num: number): boolean {
  return typeof num === 'number' && !isNaN(num) && num >= 0;
}

/**
 * Validate string is not empty
 * @param str String
 * @returns True if non-empty string
 */
export function isNonEmptyString(str: string): boolean {
  return typeof str === 'string' && str.trim().length > 0;
}

/**
 * Validate array is not empty
 * @param arr Array
 * @returns True if non-empty array
 */
export function isNonEmptyArray<T>(arr: T[]): boolean {
  return Array.isArray(arr) && arr.length > 0;
}

/**
 * Sanitize HTML to prevent XSS
 * @param html HTML string
 * @returns Sanitized HTML string
 */
export function sanitizeHTML(html: string): string {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

/**
 * Validate tenant ID format
 * @param tenantId Tenant ID string
 * @returns True if valid tenant ID
 */
export function isValidTenantId(tenantId: string): boolean {
  // Allow alphanumeric, hyphens, underscores
  const tenantRegex = /^[a-zA-Z0-9_-]+$/;
  return tenantRegex.test(tenantId) && tenantId.length >= 3;
}
