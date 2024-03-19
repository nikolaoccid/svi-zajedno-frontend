export function croatianDateFormat(date?: string, shouldNotReturn = false) {
  if (!date && shouldNotReturn) return;

  const today = date && date.includes('Z') ? new Date(date) : new Date();

  const day = String(today.getUTCDate()).padStart(2, '0');
  const month = String(today.getUTCMonth() + 1).padStart(2, '0');
  const year = today.getUTCFullYear();

  return `${day}.${month}.${year}`;
}
