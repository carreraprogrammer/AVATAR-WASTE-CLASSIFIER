/**
 * Formatter Utilities
 * Helper functions for formatting dates, numbers, and strings
 */

/**
 * Format date to locale string
 * @param date Date string or Date object
 * @param locale Locale (default 'es-CO')
 * @returns Formatted date string
 */
export function formatDate(
  date: string | Date,
  locale = 'es-CO'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Format date to time string
 * @param date Date string or Date object
 * @param locale Locale (default 'es-CO')
 * @returns Formatted time string
 */
export function formatTime(
  date: string | Date,
  locale = 'es-CO'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Format date to datetime string
 * @param date Date string or Date object
 * @param locale Locale (default 'es-CO')
 * @returns Formatted datetime string
 */
export function formatDateTime(
  date: string | Date,
  locale = 'es-CO'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Format relative time (e.g., "hace 2 horas")
 * @param date Date string or Date object
 * @param locale Locale (default 'es-CO')
 * @returns Relative time string
 */
export function formatRelativeTime(
  date: string | Date,
  locale = 'es-CO'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) {
    return 'hace un momento';
  } else if (diffMin < 60) {
    return `hace ${diffMin} minuto${diffMin > 1 ? 's' : ''}`;
  } else if (diffHour < 24) {
    return `hace ${diffHour} hora${diffHour > 1 ? 's' : ''}`;
  } else if (diffDay < 7) {
    return `hace ${diffDay} día${diffDay > 1 ? 's' : ''}`;
  } else {
    return formatDate(dateObj, locale);
  }
}

/**
 * Format number with locale
 * @param num Number to format
 * @param locale Locale (default 'es-CO')
 * @param options Intl.NumberFormatOptions
 * @returns Formatted number string
 */
export function formatNumber(
  num: number,
  locale = 'es-CO',
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(num);
}

/**
 * Format percentage
 * @param value Value (0-1 or 0-100)
 * @param decimals Number of decimal places
 * @param isDecimal Whether value is 0-1 (true) or 0-100 (false)
 * @returns Formatted percentage string
 */
export function formatPercentage(
  value: number,
  decimals = 0,
  isDecimal = true
): string {
  const percentage = isDecimal ? value * 100 : value;
  return `${percentage.toFixed(decimals)}%`;
}

/**
 * Format file size
 * @param bytes File size in bytes
 * @returns Formatted file size string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Format weight (grams to human-readable)
 * @param grams Weight in grams
 * @returns Formatted weight string
 */
export function formatWeight(grams: number): string {
  if (grams < 1000) {
    return `${grams.toFixed(0)}g`;
  } else {
    return `${(grams / 1000).toFixed(2)}kg`;
  }
}

/**
 * Format volume (ml to human-readable)
 * @param ml Volume in milliliters
 * @returns Formatted volume string
 */
export function formatVolume(ml: number): string {
  if (ml < 1000) {
    return `${ml.toFixed(0)}ml`;
  } else {
    return `${(ml / 1000).toFixed(2)}L`;
  }
}

/**
 * Truncate string with ellipsis
 * @param str String to truncate
 * @param maxLength Maximum length
 * @returns Truncated string
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

/**
 * Capitalize first letter
 * @param str String to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convert camelCase to Title Case
 * @param str camelCase string
 * @returns Title Case string
 */
export function camelToTitle(str: string): string {
  const result = str.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}
