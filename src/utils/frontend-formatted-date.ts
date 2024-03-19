export function frontendFormattedDate(date?: string) {
  const today = date && date.includes('Z') ? new Date(date) : new Date();

  const year = today.getUTCFullYear();
  const month = String(today.getUTCMonth() + 1).padStart(2, '0');
  const day = String(today.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
